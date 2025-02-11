# API del Sistema de Adopción

Esta API está diseñada para gestionar citas para adopciones de mascotas. Incluye funcionalidades para crear, actualizar y listar citas, así como gestionar la información del usuario.

## Variables de Entorno

Cree un archivo `.env` en el directorio raíz y agregue las siguientes variables:

```
MONGO_URI=<tu_cadena_de_conexión_mongodb>
PORT=<tu_puerto_del_servidor>
JWT_SECRET=<tu_secreto_jwt>
```

## Endpoints de la API

### Citas

- **Crear Cita**
  - **URL:** `/api/appointments/createAppointment`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "date": "2023-10-15T14:48:00.000Z",
      "status": "CREATED",
      "pet": "<pet_id>",
      "user": "<user_id>"
    }
    ```

### Usuarios

- **Registrar Usuario**
  - **URL:** `/api/users/register`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```

- **Iniciar Sesión**
  - **URL:** `/api/users/login`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

- **Obtener Usuario por ID**
  - **URL:** `/api/users/:uid`
  - **Método:** `GET`

- **Eliminar Usuario**
  - **URL:** `/api/users/:uid`
  - **Método:** `DELETE`

- **Actualizar Contraseña del Usuario**
  - **URL:** `/api/users/:uid/password`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
      "newPassword": "string"
    }
    ```

### Mascotas

- **Registrar Mascota**
  - **URL:** `/api/pets/register`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "age": "number",
      "type": "string",
      "breed": "string"
    }
    ```

- **Obtener Mascota por ID**
  - **URL:** `/api/pets/:pid`
  - **Método:** `GET`

- **Eliminar Mascota**
  - **URL:** `/api/pets/:pid`
  - **Método:** `DELETE`

- **Actualizar Información de la Mascota**
  - **URL:** `/api/pets/:pid`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "age": "number",
      "type": "string",
      "breed": "string"
    }
    ```

## Funcionalidades Adicionales

Las siguientes funcionalidades necesitan ser desarrolladas:

1. **Actualizar Foto del Usuario**
   - Descripción: Implementar funcionalidad para actualizar la foto de perfil del usuario.

2. **Listar Citas**
   - Descripción: Implementar funcionalidad para listar todas las citas de un usuario.

3. **Actualizar Cita**
   - Descripción: Implementar funcionalidad para actualizar una cita existente.

4. **Cancelar Cita**
   - Descripción: Implementar funcionalidad para cancelar una cita existente.


   Endpoints para README.md
1. Actualizar Foto del Usuario
Método: PATCH
Endpoint:
bash
Copiar
Editar
http://127.0.0.1:3001/adoptionSystem/v1/user/updateProfilePicture/:uid
Descripción: Permite a un usuario actualizar su foto de perfil.
Headers:
Content-Type: multipart/form-data
Parámetros:
uid (Path Param) - ID del usuario.
Body: (Formato multipart/form-data)
json
Copiar
Editar
{
  "profilePicture": "archivo_imagen.jpg"
}
Middleware: uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator
Respuesta Exitosa (200):
json
Copiar
Editar
{
  "success": true,
  "message": "Foto actualizada",
  "profilePicture": "nueva_foto.jpg"
}
Errores Comunes:
400 No hay archivo en la petición.
500 Error al actualizar la foto.
2. Listar Citas
Método: GET
Endpoint:
bash
Copiar
Editar
http://127.0.0.1:3001/adoptionSystem/v1/appointment/
Descripción: Obtiene todas las citas registradas en el sistema.
Headers:
Authorization: Bearer <token>
Respuesta Exitosa (200):
json
Copiar
Editar
[
  {
    "id": "123",
    "pet": "Max",
    "user": "Juan Pérez",
    "date": "2025-02-10T10:00:00.000Z",
    "status": "CREATED"
  }
]
Errores Comunes:
401 No autorizado.
500 Error al obtener citas.
3. Actualizar Cita
Método: PUT
Endpoint:
bash
Copiar
Editar
http://127.0.0.1:3001/adoptionSystem/v1/appointment/updateAppointment/:id
Descripción: Actualiza los datos de una cita existente.
Headers:
Content-Type: application/json
Authorization: Bearer <token>
Parámetros:
id (Path Param) - ID de la cita.
Body: (Formato JSON)
json
Copiar
Editar
{
  "date": "2025-02-15T15:00:00.000Z",
  "status": "ACCEPTED"
}
Middleware: updateAppointmentValidator
Respuesta Exitosa (200):
json
Copiar
Editar
{
  "success": true,
  "message": "Cita actualizada",
  "updatedAppointment": {
    "id": "123",
    "date": "2025-02-15T15:00:00.000Z",
    "status": "ACCEPTED"
  }
}
Errores Comunes:
400 Datos inválidos.
404 Cita no encontrada.
500 Error al actualizar la cita.
4. Cancelar Cita
Método: DELETE
Endpoint:
bash
Copiar
Editar
http://127.0.0.1:3001/adoptionSystem/v1/appointment/cancelAppointment/:id
Descripción: Cancela una cita existente en el sistema.
Headers:
Authorization: Bearer <token>
Parámetros:
id (Path Param) - ID de la cita a cancelar.
Middleware: cancelAppointmentValidator
Respuesta Exitosa (200):
json
Copiar
Editar
{
  "success": true,
  "message": "Cita cancelada"
}
Errores Comunes:
400 ID no válido.
404 Cita no encontrada.
500 Error al cancelar la cita.

