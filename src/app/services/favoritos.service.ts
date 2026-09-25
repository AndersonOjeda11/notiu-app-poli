import { Injectable, computed, inject, signal } from '@angular/core';
import { NoticiasService } from './noticias.service';

const CLAVE_FAVORITOS = 'notiu_favoritos';

@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private readonly noticiasService = inject(NoticiasService);

  readonly ids = signal<number[]>(this.leer());

  readonly favoritas = computed(() =>
    this.noticiasService.noticias().filter((n) => this.ids().includes(n.id)),
  );

  readonly cantidad = computed(() => this.favoritas().length);

  esFavorita(id: number): boolean {
    return this.ids().includes(id);
  }

  alternar(id: number): void {
    const nuevos = this.esFavorita(id) ? this.ids().filter((x) => x !== id) : [...this.ids(), id];
    this.ids.set(nuevos);
    localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(nuevos));
  }

  private leer(): number[] {
    try {
      const guardados = localStorage.getItem(CLAVE_FAVORITOS);
      return guardados ? (JSON.parse(guardados) as number[]) : [];
    } catch {
      return [];
    }
  }
}
