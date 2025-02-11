import { Schema, model } from "mongoose"; // Importa las funciones necesarias de Mongoose

/**
 * Esquema de la colección de citas en la base de datos.
 */
const appointmentSchema = Schema({
    date: {
        type: Date,
        required: true, // La fecha de la cita es obligatoria
    },
    status: {
        type: String,
        enum: ['CREATED', 'ACCEPTED', 'CANCELLED', 'COMPLETED'], // Estados permitidos para la cita
        default: 'CREATED', // Estado por defecto
        required: true,
    },
    pet: {
        type: Schema.ObjectId,
        ref: 'Pet', // Referencia al modelo de mascotas
        required: true,
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User', // Referencia al modelo de usuarios
        required: true,
    },
}, {
    timestamps: true, // Agrega automáticamente createdAt y updatedAt
    versionKey: false, // Deshabilita la versión del documento (_v)
});

export default model('Appointment', appointmentSchema); // Exporta el modelo de citas
