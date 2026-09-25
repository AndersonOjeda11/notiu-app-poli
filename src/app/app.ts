import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer],
  template: `
    <main class="flex-grow-1">
      <router-outlet />
    </main>
    <app-footer />
  `,
  host: { class: 'd-flex flex-column min-vh-100' },
})
export class App {}
