import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/user-validators.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

// Creación del enrutador de Express
const router = Router();

/**
 * @route POST /register
 * @description Registra un nuevo usuario en el sistema.
 * @access Público o restringido según la configuración del middleware.
 * @middleware uploadProfilePicture.single("profilePicture") - Maneja la subida de imágenes de perfil.
 * @middleware registerValidator - Valida los datos antes de registrar el usuario.
 * @controller register - Maneja la lógica para registrar un nuevo usuario.
 */
router.post(
    "/register",
    uploadProfilePicture.single("profilePicture"), 
    registerValidator, 
    register
);

/**
 * @route POST /login
 * @description Inicia sesión un usuario autenticado en el sistema.
 * @access Público o restringido según la configuración del middleware.
 * @middleware loginValidator - Valida las credenciales del usuario antes de iniciar sesión.
 * @controller login - Maneja la lógica de autenticación y generación de token.
 */
router.post(
    "/login",
    loginValidator,
    login
);

// Exportación del enrutador para su uso en otras partes de la aplicación
export default router;
