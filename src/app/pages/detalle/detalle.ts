import { Component, computed, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoriaClasePipe } from '../../pipes/categoria-clase.pipe';
import { FavoritosService } from '../../services/favoritos.service';
import { NoticiasService } from '../../services/noticias.service';

/** Vista de detalle de una noticia (ruta /noticias/:id). */
@Component({
  selector: 'app-detalle',
  imports: [RouterLink, DatePipe, CategoriaClasePipe],
  templateUrl: './detalle.html',
})
export class Detalle {
  private readonly noticiasService = inject(NoticiasService);
  protected readonly favoritos = inject(FavoritosService);

  /** Parámetro :id de la ruta (llega gracias a withComponentInputBinding). */
  readonly id = input.required<string>();

  protected readonly noticia = computed(() => this.noticiasService.obtenerPorId(Number(this.id())));

  /** El contenido viene con párrafos separados por líneas en blanco. */
  protected readonly parrafos = computed(() => this.noticia()?.contenido.split(/\n\s*\n/) ?? []);

  /** Otras 3 noticias para la columna lateral (prioriza la misma categoría). */
  protected readonly otras = computed(() => {
    const actual = this.noticia();
    const resto = this.noticiasService.noticias().filter((n) => n.id !== actual?.id);
    const mismaCategoria = resto.filter((n) => n.categoria === actual?.categoria);
    const demas = resto.filter((n) => n.categoria !== actual?.categoria);
    return [...mismaCategoria, ...demas].slice(0, 3);
  });
}
