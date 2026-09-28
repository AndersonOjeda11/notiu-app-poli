export type Rol = 'admin' | 'lector';

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  password: string;
  rol: Rol;
}

export type UsuarioSesion = Omit<Usuario, 'password'>;
