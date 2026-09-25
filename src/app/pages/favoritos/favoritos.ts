import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoriaClasePipe } from '../../pipes/categoria-clase.pipe';
import { FavoritosService } from '../../services/favoritos.service';

@Component({
  selector: 'app-favoritos',
  imports: [RouterLink, DatePipe, CategoriaClasePipe],
  templateUrl: './favoritos.html',
})
export default class Favoritos {
  protected readonly favoritos = inject(FavoritosService);
}
