import Pet from "../pet/pet.model.js"; // Importa el modelo de mascotas
import Appointment from "../appointment/appointment.model.js"; // Importa el modelo de citas
import { parse } from "date-fns"; // Importa la función de análisis de fechas

/**
 * Crea una nueva cita en el sistema.
 * @param {object} req - Solicitud HTTP con los datos de la cita.
 * @param {object} res - Respuesta HTTP.
 */
export const saveAppointment = async (req, res) => {
  try {
    const data = req.body;
    const isoDate = new Date(data.date);

    if (isNaN(isoDate.getTime())) {
      return res.status(400).json({ success: false, msg: "Fecha inválida" });
    }

    const pet = await Pet.findOne({ _id: data.pet });
    if (!pet) {
      return res.status(404).json({ success: false, msg: "No se encontró la mascota" });
    }

    const existAppointment = await Appointment.findOne({
      pet: data.pet,
      user: data.user,
      date: {
        $gte: new Date(isoDate).setHours(0, 0, 0, 0),
        $lt: new Date(isoDate).setHours(23, 59, 59, 999),
      },
    });

    if (existAppointment) {
      return res.status(400).json({ success: false, msg: "El usuario y la mascota ya tienen una cita para este día" });
    }

    const appointment = new Appointment({ ...data, date: isoDate });
    await appointment.save();

    return res.status(200).json({ success: true, msg: `Cita creada exitosamente en fecha ${data.date}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Error al crear la cita", error });
  }
};

/**
 * Obtiene la lista de todas las citas registradas.
 * @param {object} req - Solicitud HTTP con parámetros opcionales de paginación.
 * @param {object} res - Respuesta HTTP con la lista de citas.
 */
export const getAppointments = async (req, res) => {
  try {
    const { limite = 10, desde = 0 } = req.query;
    const appointments = await Appointment.find()
      .populate("pet", "name")
      .populate("user", "username email")
      .skip(Number(desde))
      .limit(Number(limite));
    
    const total = await Appointment.countDocuments();
    return res.status(200).json({ success: true, total, appointments });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Error al listar las citas", error: err.message });
  }
};

/**
 * Actualiza una cita existente.
 * @param {object} req - Solicitud HTTP con los nuevos datos de la cita.
 * @param {object} res - Respuesta HTTP con la cita actualizada.
 */
export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, pet, user, status } = req.body;
    
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { date, pet, user, status },
      { new: true, runValidators: true }
    ).populate("pet", "name").populate("user", "username email");
    
    if (!updatedAppointment) {
      return res.status(404).json({ success: false, msg: "No se encontró la cita" });
    }

    return res.status(200).json({ success: true, msg: "Cita actualizada exitosamente", updatedAppointment });
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Error al actualizar la cita", error: err.message });
  }
};

/**
 * Cancela una cita existente cambiando su estado a "CANCELLED".
 * @param {object} req - Solicitud HTTP con el ID de la cita a cancelar.
 * @param {object} res - Respuesta HTTP con la cita cancelada.
 */
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndUpdate(id, { status: "CANCELLED" }, { new: true });
    
    if (!appointment) {
      return res.status(404).json({ success: false, msg: "No se encontró la cita" });
    }

    return res.status(200).json({ success: true, msg: "Cita cancelada exitosamente", appointment });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error al cancelar la cita", error: err.message });
  }
};