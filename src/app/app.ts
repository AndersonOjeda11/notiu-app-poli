import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { ModalConfirmacion } from './components/modal-confirmacion/modal-confirmacion';
import { Navbar } from './components/navbar/navbar';
import { ConfirmacionService } from './services/confirmacion.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar, ModalConfirmacion],
  template: `
    <app-navbar />
    <main class="flex-grow-1">
      <router-outlet />
    </main>
    <app-footer />

    @if (confirmacion.solicitud(); as solicitud) {
      <app-modal-confirmacion
        [titulo]="solicitud.titulo"
        [mensaje]="solicitud.mensaje"
        [textoConfirmar]="solicitud.textoConfirmar"
        [textoCancelar]="solicitud.textoCancelar"
        [variante]="solicitud.variante"
        (confirmado)="confirmacion.responder(true)"
        (cancelado)="confirmacion.responder(false)"
      />
    }
  `,
  host: { class: 'd-flex flex-column min-vh-100' },
})
export class App {
  protected readonly confirmacion = inject(ConfirmacionService);
}
