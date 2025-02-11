import { Router } from "express";
import { saveAppointment, getAppointments, cancelAppointment, updateAppointment } from "./appointment.controller.js";
import { createAppointmentValidator, updateAppointmentValidator,  cancelAppointmentValidator,  } from "../middlewares/appointment-validators.js";

const router = Router();

router.post("/createAppointment", createAppointmentValidator, saveAppointment);

router.get("/", getAppointments);

router.put("/updateAppointment/:id", updateAppointmentValidator, updateAppointment)

router.delete("/cancelAppointment/:id", cancelAppointmentValidator, cancelAppointment )
export default router;