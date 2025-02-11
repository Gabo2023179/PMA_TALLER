import { hash, verify } from "argon2";
import User from "../user/user.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";

/**
 * @function register
 * @description Registra un nuevo usuario en el sistema.
 * @param {Object} req - Objeto de solicitud con los datos del usuario.
 * @param {Object} res - Objeto de respuesta para enviar la confirmación o error.
 * @returns {JSON} Respuesta con el estado de la operación.
 */
export const register = async (req, res) => {
    try {
        const data = req.body;
        let profilePicture = req.file ? req.file.filename : null;
        const encryptedPassword = await hash(data.password);
        data.password = encryptedPassword;
        data.profilePicture = profilePicture;

        const user = await User.create(data);

        return res.status(201).json({
            message: "User has been created",
            name: user.name,
            email: user.email
        });
    } catch (err) {
        return res.status(500).json({
            message: "User registration failed",
            error: err.message
        });
    }
};

/**
 * @function login
 * @description Maneja la autenticación de usuarios mediante email o nombre de usuario.
 * @param {Object} req - Objeto de solicitud con credenciales de usuario.
 * @param {Object} res - Objeto de respuesta para enviar el token y detalles del usuario.
 * @returns {JSON} Respuesta con el estado de autenticación y el token.
 */
export const login = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const user = await User.findOne({
            $or: [{ email: email }, { username: username }]
        });

        if (!user) {
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error: "No existe el usuario o correo ingresado"
            });
        }

        const validPassword = await verify(user.password, password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error: "Contraseña incorrecta"
            });
        }

        const token = await generateJWT(user.id);

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token,
                profilePicture: user.profilePicture
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "login failed, server error",
            error: err.message
        });
    }
};
