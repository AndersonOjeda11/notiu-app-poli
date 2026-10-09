/** Categorías disponibles para clasificar una noticia. */
export const CATEGORIAS = ['Tecnología', 'Educación', 'Turismo', 'Comercio'] as const;

export type Categoria = (typeof CATEGORIAS)[number];

/** Estructura de una noticia tal como está en public/data/noticias.json. */
export interface Noticia {
  id: number;
  titulo: string;
  categoria: Categoria;
  /** Fecha de publicación en formato ISO (AAAA-MM-DD). */
  fecha: string;
  autor: string;
  imagen: string;
  descripcion: string;
  /** Texto completo; los párrafos se separan con "\n\n". */
  contenido: string;
  destacada: boolean;
}

/** Datos que se piden en el formulario para crear una noticia. */
export type NuevaNoticia = Omit<Noticia, 'id' | 'fecha'>;
