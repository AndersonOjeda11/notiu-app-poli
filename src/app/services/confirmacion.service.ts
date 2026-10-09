import { Injectable, signal } from '@angular/core';
import { CONFIRMACION_POR_DEFECTO, OpcionesConfirmacion } from '../models/confirmacion.model';

@Injectable({ providedIn: 'root' })
export class ConfirmacionService {
  private readonly solicitudActual = signal<Required<OpcionesConfirmacion> | null>(null);
  private resolver: ((respuesta: boolean) => void) | null = null;

  readonly solicitud = this.solicitudActual.asReadonly();

  confirmar(opciones: OpcionesConfirmacion): Promise<boolean> {
    this.responder(false);
    this.solicitudActual.set({ ...CONFIRMACION_POR_DEFECTO, ...opciones });
    return new Promise<boolean>((resolve) => (this.resolver = resolve));
  }

  responder(respuesta: boolean): void {
    const resolver = this.resolver;
    this.resolver = null;
    this.solicitudActual.set(null);
    resolver?.(respuesta);
  }
}
