import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoticiaCard } from '../../components/noticia-card/noticia-card';
import { NoticiasService } from '../../services/noticias.service';

interface Testimonio {
  texto: string;
  nombre: string;
  carrera: string;
}

/** Página de inicio: bienvenida, noticias destacadas, testimonios y llamado a la acción. */
@Component({
  selector: 'app-inicio',
  imports: [RouterLink, NoticiaCard],
  templateUrl: './inicio.html',
})
export class Inicio {
  private readonly noticiasService = inject(NoticiasService);

  /** Hasta 3 noticias marcadas como destacadas (si no hay, las 3 más recientes). */
  protected readonly destacadas = computed(() => {
    const todas = this.noticiasService.noticias();
    const marcadas = todas.filter((n) => n.destacada);
    return (marcadas.length ? marcadas : todas).slice(0, 3);
  });

  protected readonly testimonios: Testimonio[] = [
    {
      texto: 'NotiU es la forma más rápida de enterarme de los eventos que pasan en el campus cada semana.',
      nombre: 'Carlos Mendoza',
      carrera: 'Ingeniería de Sistemas',
    },
    {
      texto: 'Me encanta poder guardar las noticias en favoritos y leerlas después con calma.',
      nombre: 'Sofía Valenzuela',
      carrera: 'Comunicación Social',
    },
    {
      texto: 'Gracias a la sección de educación encontré la convocatoria de becas a tiempo.',
      nombre: 'Martín Gómez',
      carrera: 'Administración de Empresas',
    },
  ];
}
