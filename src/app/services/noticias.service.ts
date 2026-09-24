import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { NuevaNoticia, Noticia } from '../models/noticia.model';

const CLAVE_NOTICIAS = 'notiu_noticias';

/**
 * Maneja el listado de noticias.
 * La primera vez se cargan desde public/data/noticias.json; después, los cambios
 * del mini CRUD (crear / eliminar) se guardan en localStorage.
 */
@Injectable({ providedIn: 'root' })
export class NoticiasService {
  private readonly http = inject(HttpClient);

  /** Noticias ordenadas de la más reciente a la más antigua. */
  readonly noticias = signal<Noticia[]>([]);

  /** Se ejecuta al iniciar la app (ver app.config.ts). */
  async cargar(): Promise<void> {
    const guardadas = localStorage.getItem(CLAVE_NOTICIAS);
    if (guardadas) {
      this.noticias.set(JSON.parse(guardadas) as Noticia[]);
      return;
    }
    const desdeJson = await firstValueFrom(this.http.get<Noticia[]>('data/noticias.json'));
    this.noticias.set(this.ordenar(desdeJson));
  }

  obtenerPorId(id: number): Noticia | undefined {
    return this.noticias().find((n) => n.id === id);
  }

  crear(datos: NuevaNoticia): Noticia {
    const siguienteId = Math.max(0, ...this.noticias().map((n) => n.id)) + 1;
    const nueva: Noticia = {
      ...datos,
      id: siguienteId,
      fecha: new Date().toISOString().slice(0, 10),
    };
    this.guardar(this.ordenar([nueva, ...this.noticias()]));
    return nueva;
  }

  /** Actualiza una noticia existente; conserva su id y fecha original. */
  actualizar(id: number, datos: NuevaNoticia): void {
    const existente = this.obtenerPorId(id);
    if (!existente) {
      return;
    }
    const actualizada: Noticia = { ...datos, id, fecha: existente.fecha };
    const noticias = this.noticias().map((n) => (n.id === id ? actualizada : n));
    this.guardar(this.ordenar(noticias));
  }

  eliminar(id: number): void {
    this.guardar(this.noticias().filter((n) => n.id !== id));
  }

  /** Borra los cambios locales y vuelve a los datos originales del JSON. */
  async restablecer(): Promise<void> {
    localStorage.removeItem(CLAVE_NOTICIAS);
    await this.cargar();
  }

  private guardar(noticias: Noticia[]): void {
    this.noticias.set(noticias);
    localStorage.setItem(CLAVE_NOTICIAS, JSON.stringify(noticias));
  }

  private ordenar(noticias: Noticia[]): Noticia[] {
    return [...noticias].sort((a, b) => b.fecha.localeCompare(a.fecha) || b.id - a.id);
  }
}
