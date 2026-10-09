import { Injectable } from '@angular/core';

export interface MensajeContacto {
  nombre: string;
  correo: string;
  asunto: string;
  mensaje: string;
  fecha: string;
}

const CLAVE_MENSAJES = 'notiu_mensajes';

/** Guarda los mensajes del formulario de contacto en localStorage (no hay backend real). */
@Injectable({ providedIn: 'root' })
export class ContactoService {
  enviar(datos: Omit<MensajeContacto, 'fecha'>): void {
    const mensajes = this.listar();
    mensajes.push({ ...datos, fecha: new Date().toISOString() });
    localStorage.setItem(CLAVE_MENSAJES, JSON.stringify(mensajes));
  }

  listar(): MensajeContacto[] {
    const guardados = localStorage.getItem(CLAVE_MENSAJES);
    return guardados ? (JSON.parse(guardados) as MensajeContacto[]) : [];
  }
}
