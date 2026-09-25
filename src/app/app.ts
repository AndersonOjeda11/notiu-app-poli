import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/** Componente raíz del proyecto base (Angular + Bootstrap). */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="container py-5">
      <h1 class="display-6 fw-bold"><i class="bi bi-newspaper text-primary"></i> NotiU</h1>
      <p class="text-body-secondary">Proyecto base: Angular 22 + Bootstrap 5.</p>
    </div>
    <router-outlet />
  `,
})
export class App {}
