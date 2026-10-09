import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CATEGORIAS, Categoria, Noticia } from '../../models/noticia.model';
import { CategoriaClasePipe } from '../../pipes/categoria-clase.pipe';
import { ConfirmacionService } from '../../services/confirmacion.service';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, RouterLink, DatePipe, CategoriaClasePipe],
  templateUrl: './admin.html',
})
export default class Admin {
  protected readonly noticiasService = inject(NoticiasService);
  private readonly confirmacion = inject(ConfirmacionService);
  protected readonly categorias = CATEGORIAS;
  protected readonly aviso = signal<string | null>(null);
  /** Id de la noticia cargada en el formulario para editarla, o null si se está creando una nueva. */
  protected readonly editandoId = signal<number | null>(null);

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
    const id = this.editandoId();

    if (id !== null) {
      const imagenActual = this.noticiasService.obtenerPorId(id)?.imagen ?? '';
      this.noticiasService.actualizar(id, {
        ...datos,
        categoria: datos.categoria as Categoria,
        imagen: datos.imagen || imagenActual,
      });
      this.cancelarEdicion();
      this.aviso.set(`Noticia "${datos.titulo}" actualizada correctamente.`);
      return;
    }

    const nueva = this.noticiasService.crear({
      ...datos,
      categoria: datos.categoria as Categoria,
      imagen: datos.imagen || `https://picsum.photos/seed/notiu${Date.now()}/800/450`,
    });
    this.form.reset();
    this.aviso.set(`Noticia "${nueva.titulo}" creada correctamente.`);
  }

  editar(noticia: Noticia): void {
    this.editandoId.set(noticia.id);
    this.form.reset({
      titulo: noticia.titulo,
      categoria: noticia.categoria,
      imagen: noticia.imagen,
      autor: noticia.autor,
      descripcion: noticia.descripcion,
      contenido: noticia.contenido,
      destacada: noticia.destacada,
    });
    this.aviso.set(null);
  }

  cancelarEdicion(): void {
    this.editandoId.set(null);
    this.form.reset();
  }

  async eliminar(id: number, titulo: string): Promise<void> {
    const confirmado = await this.confirmacion.confirmar({
      titulo: 'Eliminar noticia',
      mensaje: `¿Seguro que quieres eliminar "${titulo}"? Esta acción no se puede deshacer.`,
      textoConfirmar: 'Eliminar',
      variante: 'danger',
    });
    if (!confirmado) {
      return;
    }
    if (this.editandoId() === id) {
      this.cancelarEdicion();
    }
    this.noticiasService.eliminar(id);
    this.aviso.set(`Noticia "${titulo}" eliminada.`);
  }
}
