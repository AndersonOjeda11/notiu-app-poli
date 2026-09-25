import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CATEGORIAS, Categoria } from '../../models/noticia.model';
import { CategoriaClasePipe } from '../../pipes/categoria-clase.pipe';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, RouterLink, DatePipe, CategoriaClasePipe],
  templateUrl: './admin.html',
})
export default class Admin {
  protected readonly noticiasService = inject(NoticiasService);
  protected readonly categorias = CATEGORIAS;
  protected readonly aviso = signal<string | null>(null);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    titulo: ['', [Validators.required, Validators.minLength(10)]],
    categoria: ['' as Categoria | '', Validators.required],
    imagen: ['', Validators.pattern(/^https?:\/\/.+/)],
    autor: ['', Validators.required],
    descripcion: ['', [Validators.required, Validators.maxLength(160)]],
    contenido: ['', [Validators.required, Validators.minLength(30)]],
    destacada: [false],
  });

  invalido(campo: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[campo];
    return control.touched && control.invalid;
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const datos = this.form.getRawValue();
    const nueva = this.noticiasService.crear({
      ...datos,
      categoria: datos.categoria as Categoria,
      imagen: datos.imagen || `https://picsum.photos/seed/notiu${Date.now()}/800/450`,
    });
    this.form.reset();
    this.aviso.set(`Noticia "${nueva.titulo}" creada correctamente.`);
  }

  eliminar(id: number, titulo: string): void {
    if (confirm(`¿Seguro que quieres eliminar "${titulo}"? Esta acción no se puede deshacer.`)) {
      this.noticiasService.eliminar(id);
      this.aviso.set(`Noticia "${titulo}" eliminada.`);
    }
  }

  async restablecer(): Promise<void> {
    if (
      confirm(
        'Esto borra los cambios hechos y vuelve a cargar las noticias del archivo JSON. ¿Continuar?',
      )
    ) {
      await this.noticiasService.restablecer();
      this.aviso.set('Se restablecieron las noticias originales del JSON.');
    }
  }
}
