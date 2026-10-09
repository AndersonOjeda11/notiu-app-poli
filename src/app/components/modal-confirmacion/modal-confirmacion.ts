import {
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { CONFIRMACION_POR_DEFECTO, VarianteConfirmacion } from '../../models/confirmacion.model';

let siguienteId = 0;

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.html',
  host: {
    '(document:keydown.escape)': 'cancelado.emit()',
  },
})
export class ModalConfirmacion {
  readonly titulo = input.required<string>();
  readonly mensaje = input.required<string>();
  readonly textoConfirmar = input<string>(CONFIRMACION_POR_DEFECTO.textoConfirmar);
  readonly textoCancelar = input<string>(CONFIRMACION_POR_DEFECTO.textoCancelar);
  readonly variante = input<VarianteConfirmacion>(CONFIRMACION_POR_DEFECTO.variante);

  readonly confirmado = output<void>();
  readonly cancelado = output<void>();

  protected readonly idTitulo = `modal-confirmacion-titulo-${siguienteId}`;
  protected readonly idMensaje = `modal-confirmacion-mensaje-${siguienteId++}`;

  private readonly dialogo = viewChild.required<ElementRef<HTMLElement>>('dialogo');
  private readonly botonCancelar =
    viewChild.required<ElementRef<HTMLButtonElement>>('botonCancelar');

  constructor() {
    const documento = inject(DOCUMENT);
    const focoAnterior = documento.activeElement as HTMLElement | null;

    documento.body.classList.add('modal-open');

    afterNextRender(() => this.botonCancelar().nativeElement.focus());

    inject(DestroyRef).onDestroy(() => {
      documento.body.classList.remove('modal-open');
      if (focoAnterior?.isConnected) {
        focoAnterior.focus();
      }
    });
  }

  protected clicFondo(evento: MouseEvent): void {
    if (evento.target === evento.currentTarget) {
      this.cancelado.emit();
    }
  }

  protected atraparFoco(evento: KeyboardEvent): void {
    if (evento.key !== 'Tab') {
      return;
    }
    const dialogo = this.dialogo().nativeElement;
    const botones = dialogo.querySelectorAll<HTMLButtonElement>('button');
    const primero = botones[0];
    const ultimo = botones[botones.length - 1];
    const activo = dialogo.ownerDocument.activeElement;

    if (evento.shiftKey && activo === primero) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && activo === ultimo) {
      evento.preventDefault();
      primero.focus();
    }
  }
}
