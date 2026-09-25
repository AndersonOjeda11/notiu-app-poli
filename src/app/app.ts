import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';
import { AuthService } from './services/auth.service';

/** Componente raíz: navbar y footer solo se muestran cuando hay sesión iniciada. */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  template: `
    @if (auth.estaAutenticado()) {
      <app-navbar />
    }
    <main class="flex-grow-1">
      <router-outlet />
    </main>
    @if (auth.estaAutenticado()) {
      <app-footer />
    }
  `,
  host: { class: 'd-flex flex-column min-vh-100' },
})
export class App {
  protected readonly auth = inject(AuthService);
}
