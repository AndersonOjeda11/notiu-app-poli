import { Routes } from '@angular/router';
import { adminGuard, authGuard, invitadoGuard } from './guards/auth.guard';

/**
 * Rutas de la aplicación. Cada página se carga de forma diferida (lazy loading).
 * Todas, excepto el login, requieren haber iniciado sesión.
 */
export const routes: Routes = [
  {
    path: 'login',
    title: 'Iniciar sesión | NotiU',
    canActivate: [invitadoGuard],
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        title: 'Inicio | NotiU',
        loadComponent: () => import('./pages/inicio/inicio').then((m) => m.Inicio),
      },
      {
        path: 'noticias',
        title: 'Noticias | NotiU',
        loadComponent: () => import('./pages/noticias/noticias').then((m) => m.Noticias),
      },
      {
        path: 'noticias/:id',
        title: 'Detalle | NotiU',
        loadComponent: () => import('./pages/detalle/detalle').then((m) => m.Detalle),
      },
      {
        path: 'favoritos',
        title: 'Mis favoritos | NotiU',
        loadComponent: () => import('./pages/favoritos/favoritos').then((m) => m.Favoritos),
      },
      {
        path: 'contacto',
        title: 'Contacto | NotiU',
        loadComponent: () => import('./pages/contacto/contacto').then((m) => m.Contacto),
      },
      {
        path: 'admin',
        title: 'Administrar | NotiU',
        canActivate: [adminGuard],
        loadComponent: () => import('./pages/admin/admin').then((m) => m.Admin),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
