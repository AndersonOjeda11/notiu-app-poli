import { Component, computed, inject, signal } from '@angular/core';
import { NoticiaCard } from '../../components/noticia-card/noticia-card';
import { CATEGORIAS } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';

/** Listado de noticias con búsqueda por texto y filtro por categoría. */
@Component({
  selector: 'app-noticias',
  imports: [NoticiaCard],
  templateUrl: './noticias.html',
})
export class Noticias {
  private readonly noticiasService = inject(NoticiasService);

  protected readonly categorias = ['Todas', ...CATEGORIAS];
  protected readonly busqueda = signal('');
  protected readonly categoria = signal('Todas');

  /** Se recalcula solo cuando cambian las noticias, la búsqueda o la categoría. */
  protected readonly filtradas = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();
    const categoria = this.categoria();
    return this.noticiasService.noticias().filter(
      (n) =>
        (categoria === 'Todas' || n.categoria === categoria) &&
        (!texto || n.titulo.toLowerCase().includes(texto) || n.descripcion.toLowerCase().includes(texto)),
    );
  });

  limpiarFiltros(): void {
    this.busqueda.set('');
    this.categoria.set('Todas');
  }
}
