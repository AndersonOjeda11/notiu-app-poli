import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Noticia } from '../../models/noticia.model';
import { CategoriaClasePipe } from '../../pipes/categoria-clase.pipe';
import { FavoritosService } from '../../services/favoritos.service';

/** Tarjeta reutilizable de noticia: imagen, categoría, título, descripción, "Ver más" y favorito. */
@Component({
  selector: 'app-noticia-card',
  imports: [RouterLink, DatePipe, CategoriaClasePipe],
  templateUrl: './noticia-card.html',
})
export class NoticiaCard {
  readonly noticia = input.required<Noticia>();
  protected readonly favoritos = inject(FavoritosService);
}
