import { Pipe, PipeTransform } from '@angular/core';

const CLASES: Record<string, string> = {
  Tecnología: 'text-bg-primary',
  Educación: 'text-bg-success',
  Turismo: 'text-bg-warning',
  Comercio: 'text-bg-info',
};

/** Devuelve la clase de Bootstrap para el badge de cada categoría. Uso: {{ n.categoria | categoriaClase }} */
@Pipe({ name: 'categoriaClase' })
export class CategoriaClasePipe implements PipeTransform {
  transform(categoria: string): string {
    return CLASES[categoria] ?? 'text-bg-secondary';
  }
}
