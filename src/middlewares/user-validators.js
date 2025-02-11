import { body, param } from "express-validator"; // Importa funciones de validación de express-validator
import { emailExists, usernameExists, userExists } from "../helpers/db-validators.js"; // Importa validadores personalizados
import { validarCampos } from "./validate-fields.js"; // Middleware para validar campos
import { deleteFileOnError } from "./delete-file-on-error.js"; // Middleware para eliminar archivos en caso de error
import { handleErrors } from "./handle-errors.js"; // Middleware para manejar errores

// Validación para el registro de usuario
export const registerValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"), // Verifica que el nombre no esté vacío
    body("username").notEmpty().withMessage("El username es requerido"), // Verifica que el username no esté vacío
    body("email").notEmpty().withMessage("El email es requerido"), // Verifica que el email no esté vacío
    body("email").isEmail().withMessage("No es un email válido"), // Verifica que el email tenga un formato válido
    body("email").custom(emailExists), // Valida que el email no exista en la base de datos
    body("username").custom(usernameExists), // Valida que el username no exista en la base de datos
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("El password debe cumplir con los requisitos de seguridad"), // Valida que el password cumpla con requisitos de seguridad
    validarCampos,
    deleteFileOnError,
    handleErrors
];

// Validación para el inicio de sesión
export const loginValidator = [
    body("email").optional().isEmail().withMessage("No es un email válido"), // Email opcional pero debe tener formato válido
    body("username").optional().isString().withMessage("Username es en formato erróneo"), // Username opcional pero debe ser string
    body("password").isLength({min: 8}).withMessage("El password debe contener al menos 8 caracteres"), // Valida el tamaño del password
    validarCampos,
    handleErrors
];

// Validación para obtener un usuario por ID
export const getUserByIdValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"), // Valida que el ID sea un MongoID válido
    param("uid").custom(userExists), // Valida que el usuario exista
    validarCampos,
    handleErrors
];

// Validación para eliminar un usuario
export const deleteUserValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"), // Valida que el ID sea un MongoID válido
    param("uid").custom(userExists), // Valida que el usuario exista
    validarCampos,
    handleErrors
];

// Validación para actualizar la contraseña de un usuario
export const updatePasswordValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"), // Valida que el ID sea un MongoID válido
    param("uid").custom(userExists), // Valida que el usuario exista
    body("newPassword").isLength({min: 8}).withMessage("El password debe contener al menos 8 caracteres"), // Valida la longitud del nuevo password
    validarCampos,
    handleErrors
];

// Validación para actualizar datos de usuario
export const updateUserValidator = [
    param("id").isMongoId().withMessage("No es un ID válido"), // Valida que el ID sea un MongoID válido
    param("id").custom(userExists), // Valida que el usuario exista
    validarCampos,
    handleErrors
];

// Validación para actualizar la foto de perfil del usuario
export const updateProfilePictureValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"), // Valida que el ID sea un MongoID válido
    param("uid").custom(userExists), // Valida que el usuario exista
    validarCampos,
    deleteFileOnError,
    handleErrors
];