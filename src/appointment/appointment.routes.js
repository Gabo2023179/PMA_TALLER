import { Router } from "express";
import { saveAppointment, getAppointments, cancelAppointment, updateAppointment } from "./appointment.controller.js";
import { createAppointmentValidator, updateAppointmentValidator, cancelAppointmentValidator } from "../middlewares/appointment-validators.js";

// Creación de un nuevo enrutador de Express
const router = Router();

/**
 * @route POST /createAppointment
 * @description Crea una nueva cita en el sistema.
 * @access Público o restringido según la configuración del middleware.
 * @middleware createAppointmentValidator - Valida los datos antes de crear la cita.
 * @controller saveAppointment - Maneja la lógica para almacenar la cita en la base de datos.
 */
router.post("/createAppointment", createAppointmentValidator, saveAppointment);

/**
 * @route GET /
 * @description Obtiene todas las citas registradas en el sistema.
 * @access Público o restringido según la configuración del middleware.
 * @controller getAppointments - Recupera la lista de citas desde la base de datos.
 */
router.get("/", getAppointments);

/**
 * @route PUT /updateAppointment/:id
 * @description Actualiza una cita existente en el sistema.
 * @access Público o restringido según la configuración del middleware.
 * @middleware updateAppointmentValidator - Valida los datos antes de actualizar la cita.
 * @controller updateAppointment - Maneja la lógica para actualizar la cita en la base de datos.
 * @param {string} id - ID de la cita que se desea actualizar.
 */
router.put("/updateAppointment/:id", updateAppointmentValidator, updateAppointment);

/**
 * @route DELETE /cancelAppointment/:id
 * @description Cancela una cita existente en el sistema.
 * @access Público o restringido según la configuración del middleware.
 * @middleware cancelAppointmentValidator - Valida los datos antes de cancelar la cita.
 * @controller cancelAppointment - Maneja la lógica para cancelar la cita en la base de datos.
 * @param {string} id - ID de la cita que se desea cancelar.
 */
router.delete("/cancelAppointment/:id", cancelAppointmentValidator, cancelAppointment);

// Exportación del enrutador para su uso en otras partes de la aplicación
export default router;