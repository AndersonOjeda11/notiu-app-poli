# NotiU — Portal de noticias

Proyecto de la materia Desarrollo Front-end.

- Angular 22
- Bootstrap 5.3 + Bootstrap Icons

## Funcionalidades

- **Inicio**: noticias destacadas.
- **Noticias**: listado con búsqueda por texto, filtro por categoría y paginación (6 por página).
- **Detalle**: vista completa de cada noticia (`/noticias/:id`).
- **Favoritos**: guardar y consultar noticias favoritas.
- **Contacto**: formulario validado para enviar mensajes.
- **Login**: inicio de sesión con opción "recordarme" (la sesión se guarda en `localStorage` o `sessionStorage`).
- **Administración** (`/admin`, solo rol admin): mini CRUD de noticias protegido por guard.

## Usuarios de prueba

| Correo           | Contraseña | Rol   |
| ----------------- | ---------- | ----- |
| admin@notiu.com   | admin123   | admin |

## Cómo ejecutarlo

Requiere Node 22.22+ o 24+.

```bash
npm install
npm start
```

Abrir http://localhost:4200
