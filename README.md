# Adoption System API

This API is designed to manage appointments for pet adoptions. It includes functionalities for creating, updating, and listing appointments, as well as managing user information.

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
MONGO_URI=<your_mongodb_connection_string>
PORT=<your_server_port>
JWT_SECRET=<your_jwt_secret>
```

## API Endpoints

### Appointments

- **Create Appointment**
  - **URL:** `/api/appointments/createAppointment`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
      "date": "2023-10-15T14:48:00.000Z",
      "status": "CREATED",
      "pet": "<pet_id>",
      "user": "<user_id>"
    }
    ```
  - **Headers:**
    - `Authorization: Bearer <token>`

### Users

- **Register User**
  - **URL:** `/api/users/register`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
      "name": "string",
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```

- **Login User**
  - **URL:** `/api/users/login`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

- **Get User by ID**
  - **URL:** `/api/users/:uid`
  - **Method:** `GET`
  - **Headers:**
    - `Authorization: Bearer <token>`

- **Delete User**
  - **URL:** `/api/users/:uid`
  - **Method:** `DELETE`
  - **Headers:**
    - `Authorization: Bearer <token>`

- **Update User Password**
  - **URL:** `/api/users/:uid/password`
  - **Method:** `PUT`
  - **Body:**
    ```json
    {
      "newPassword": "string"
    }
    ```
  - **Headers:**
    - `Authorization: Bearer <token>`

## Additional Functionalities

The following functionalities need to be developed:

1. **Update User Photo**
   - Description: Implement functionality to update the user's profile photo.

2. **List Appointments**
   - Description: Implement functionality to list all appointments for a user.

3. **Update Appointment**
   - Description: Implement functionality to update an existing appointment.

4. **Cancel Appointment**
   - Description: Implement functionality to cancel an existing appointment.
