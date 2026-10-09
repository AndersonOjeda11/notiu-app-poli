import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
})
export default class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly returnUrl = input<string>('/');

  protected readonly error = signal(false);
  protected readonly cargando = signal(false);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    recordar: [false],
  });

  async ingresar(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.error.set(false);
    this.cargando.set(true);

    const { correo, password, recordar } = this.form.getRawValue();
    const ok = await this.auth.login(correo, password, recordar);

    this.cargando.set(false);
    if (ok) {
      this.router.navigateByUrl(this.returnUrl() || '/');
    } else {
      this.error.set(true);
    }
  }
}
