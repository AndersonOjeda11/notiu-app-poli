export type VarianteConfirmacion = 'primary' | 'danger' | 'warning';

export interface OpcionesConfirmacion {
  titulo: string;
  mensaje: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  variante?: VarianteConfirmacion;
}

export const CONFIRMACION_POR_DEFECTO = {
  textoConfirmar: 'Confirmar',
  textoCancelar: 'Cancelar',
  variante: 'primary',
} as const satisfies Partial<OpcionesConfirmacion>;
