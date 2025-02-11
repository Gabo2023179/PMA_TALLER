import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { petExists, userExists } from "../helpers/db-validators.js";

export const createAppointmentValidator = [
    body("date").notEmpty().withMessage("La fecha es requerida"),
    body("date").isISO8601().withMessage("Formato de fecha inválido"),
    body("pet").notEmpty().withMessage("La mascota es requerida"),
    body("pet").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("user").notEmpty().withMessage("El usuario es requerido"),
    body("user").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
];

/**
 * Middleware de validación para actualizar una cita.
 * 
 * - Verifica que el parámetro 'id' sea un identificador válido de MongoDB.
 * - Opcionalmente, valida que 'pet' y 'user' existan en la base de datos.
 * - Valida que 'date' tenga un formato ISO 8601 válido.
 * - Verifica que 'status' esté dentro de los valores permitidos.
 * - Aplica validaciones de campos y manejo de errores.
 */
export const updateAppointmentValidator = [
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("pet").optional().custom(petExists),
    body("user").optional().custom(userExists),
    body("date").optional().isISO8601().withMessage("Formato de fecha inválido"),
    body("status").optional().isIn(["CREATED", "ACCEPTED", "CANCELLED", "COMPLETED"]).withMessage("Estado inválido"),
    validarCampos,
    handleErrors
];

/**
 * Middleware de validación para cancelar una cita.
 * 
 * - Verifica que el parámetro 'id' sea un identificador válido de MongoDB.
 * - Aplica validaciones de campos y manejo de errores.
 */
export const cancelAppointmentValidator = [
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
];
