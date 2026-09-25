import { Routes } from '@angular/router';

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
    loadComponent: () => import('./pages/admin/admin'),
  },
  { path: '**', redirectTo: '' },
];
