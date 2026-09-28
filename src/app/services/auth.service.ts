import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Usuario, UsuarioSesion } from '../models/usuario.model';

const CLAVE_SESION = 'notiu_sesion';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  readonly usuario = signal<UsuarioSesion | null>(this.leerSesion());
  readonly estaAutenticado = computed(() => this.usuario() !== null);
  readonly esAdmin = computed(() => this.usuario()?.rol === 'admin');

  async login(correo: string, password: string, recordar: boolean): Promise<boolean> {
    const usuarios = await firstValueFrom(this.http.get<Usuario[]>('data/usuarios.json'));
    const encontrado = usuarios.find(
      (u) => u.correo.toLowerCase() === correo.trim().toLowerCase() && u.password === password,
    );
    if (!encontrado) {
      return false;
    }

    const sesion: UsuarioSesion = {
      id: encontrado.id,
      nombre: encontrado.nombre,
      correo: encontrado.correo,
      rol: encontrado.rol,
    };
    const almacenamiento = recordar ? localStorage : sessionStorage;
    almacenamiento.setItem(CLAVE_SESION, JSON.stringify(sesion));
    this.usuario.set(sesion);
    return true;
  }

  logout(): void {
    localStorage.removeItem(CLAVE_SESION);
    sessionStorage.removeItem(CLAVE_SESION);
    this.usuario.set(null);
  }

  private leerSesion(): UsuarioSesion | null {
    const guardada = localStorage.getItem(CLAVE_SESION) ?? sessionStorage.getItem(CLAVE_SESION);
    try {
      return guardada ? (JSON.parse(guardada) as UsuarioSesion) : null;
    } catch {
      return null;
    }
  }
}
