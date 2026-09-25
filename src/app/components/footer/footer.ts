import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Pie de página con información general y de contacto. */
@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="bg-dark text-light py-4 mt-5">
      <div class="container d-flex flex-column flex-md-row justify-content-between gap-3">
        <div>
          <div class="fw-bold mb-1"><i class="bi bi-newspaper text-primary me-1"></i> NotiU</div>
          <small class="text-secondary d-block">© {{ anio }} NotiU - Portal de noticias estudiantil.</small>
          <small class="text-secondary">Correo: redaccion&#64;notiu.com | Teléfono: +57 601 555 0123</small>
        </div>
        <ul class="list-inline mb-0 small align-self-md-center">
          <li class="list-inline-item"><a class="link-light" routerLink="/">Inicio</a></li>
          <li class="list-inline-item"><a class="link-light" routerLink="/noticias">Noticias</a></li>
          <li class="list-inline-item"><a class="link-light" routerLink="/contacto">Contacto</a></li>
        </ul>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly anio = new Date().getFullYear();
}
