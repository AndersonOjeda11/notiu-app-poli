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

  protected readonly porPagina = 6;
  private readonly paginaSolicitada = signal(1);

  protected readonly totalPaginas = computed(() => Math.max(1, Math.ceil(this.filtradas().length / this.porPagina)));

  /** Página actual, acotada al rango válido si los filtros reducen los resultados. */
  protected readonly pagina = computed(() => Math.min(this.paginaSolicitada(), this.totalPaginas()));

  protected readonly paginas = computed(() => Array.from({ length: this.totalPaginas() }, (_, i) => i + 1));

  protected readonly visibles = computed(() => {
    const inicio = (this.pagina() - 1) * this.porPagina;
    return this.filtradas().slice(inicio, inicio + this.porPagina);
  });

  buscar(texto: string): void {
    this.busqueda.set(texto);
    this.paginaSolicitada.set(1);
  }

  elegirCategoria(categoria: string): void {
    this.categoria.set(categoria);
    this.paginaSolicitada.set(1);
  }

  irAPagina(pagina: number): void {
    this.paginaSolicitada.set(Math.min(Math.max(1, pagina), this.totalPaginas()));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  limpiarFiltros(): void {
    this.busqueda.set('');
    this.categoria.set('Todas');
    this.paginaSolicitada.set(1);
  }
}
