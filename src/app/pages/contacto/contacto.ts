import { Component, OnInit, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactoService } from '../../services/contacto.service';

/** Correo con formato nombre@dominio.ext (Validators.email acepta "a@b", por eso se usa un patrón). */
const PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Página de contacto con formulario validado y mensaje de confirmación. */
@Component({
  selector: 'app-contacto',
  imports: [ReactiveFormsModule],
  templateUrl: './contacto.html',
})
export class Contacto implements OnInit {
  private readonly contactoService = inject(ContactoService);

  /** Título de la noticia cuando se llega desde el botón "Contactar" del detalle (?noticia=...). */
  readonly noticia = input<string>();

  protected readonly enviado = signal(false);
  protected readonly asuntos = [
    'Consulta general',
    'Consulta sobre una noticia',
    'Proponer una noticia',
    'Reportar un error',
  ];

  protected readonly form = inject(FormBuilder).nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.pattern(PATRON_CORREO)]],
    asunto: ['', Validators.required],
    mensaje: ['', [Validators.required, Validators.minLength(10)]],
  });

  ngOnInit(): void {
    const titulo = this.noticia();
    if (titulo) {
      this.form.patchValue({
        asunto: 'Consulta sobre una noticia',
        mensaje: `Hola, quiero hacer una consulta sobre la noticia "${titulo}".\n\n`,
      });
    }
  }

  /** true si el campo ya fue tocado y tiene un error (para pintar el borde rojo). */
  invalido(campo: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[campo];
    return control.touched && control.invalid;
  }

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.enviado.set(false);
      return;
    }
    this.contactoService.enviar(this.form.getRawValue());
    this.enviado.set(true);
    this.form.reset();
  }
}
