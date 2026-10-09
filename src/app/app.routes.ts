import { Routes } from '@angular/router';
import { adminGuard, invitadoGuard } from './guards/auth.guard';

export const routes: Routes = [
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
    loadComponent: () => import('./pages/favoritos/favoritos'),
  },
  {
    path: 'admin',
    title: 'Administrar | NotiU',
    canActivate: [adminGuard],
    loadComponent: () => import('./pages/admin/admin'),
  },
  {
    path: 'contacto',
    title: 'Contacto | NotiU',
    loadComponent: () => import('./pages/contacto/contacto').then((m) => m.Contacto),
  },
  {
    path: 'login',
    title: 'Iniciar sesión | NotiU',
    canActivate: [invitadoGuard],
    loadComponent: () => import('./pages/login/login'),
  },
  { path: '**', redirectTo: '' },
];
