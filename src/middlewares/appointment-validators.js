import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { petExists, userExists, } from "../helpers/db-validators.js";

export const createAppointmentValidator = [
    body("date").notEmpty().withMessage("La fecha es requerida"),
    body("pet").notEmpty().withMessage("La mascota es requerida"),
    body("pet").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
];

export const updateAppointmentValidator = [
    param("id").isMongoId().withMessage("No es un ID valido de MongoDB"),
    body("pet").custom(petExists),
    body("user").custom(userExists),
    body("pet").optional().notEmpty().withMessage("la mascota es requerida"),
    body("user").optional().notEmpty().withMessage("El usurio es requerido"),
    body("date").optional().notEmpty().withMessage("La fecha es requerida"),
    validarCampos,
    handleErrors
];

export const cancelAppointmentValidator = [
    param("id").isMongoId().withMessage("No es un ID valido de MongoDB"),
    body("pet").custom(petExists),
    body("user").custom(userExists),
    validarCampos,
    handleErrors
]