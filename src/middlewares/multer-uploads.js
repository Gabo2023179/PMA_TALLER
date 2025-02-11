import multer from "multer"; // Importa multer para manejar la subida de archivos
import { dirname, extname, join } from "path"; // Importa funciones para manejar rutas de archivos
import { fileURLToPath } from "url"; // Permite obtener la ruta actual del archivo

// Obtiene el directorio actual del archivo en ejecución
const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));

// Definición de los tipos de archivos permitidos
const MIMETYPES = ["image/png", "image/jpg", "image/jpeg"];

// Tamaño máximo permitido para los archivos en bytes (100MB)
const MAX_SIZE = 100000000;

/**
 * Crea una configuración personalizada de multer para la subida de archivos.
 * @param {string} destinationFolder - Carpeta de destino donde se almacenarán los archivos subidos.
 * @returns {multer.Multer} - Configuración de multer.
 */
const createMulterConfig = (destinationFolder) => {
    return multer({
        storage: multer.diskStorage({
            // Define la carpeta de destino para almacenar los archivos
            destination: (req, file, cb) => {
                const fullPath = join(CURRENT_DIR, destinationFolder);
                req.filePath = fullPath; // Guarda la ruta de destino en el request
                cb(null, fullPath);
            },
            // Define el nombre del archivo a almacenar
            filename: (req, file, cb) => {
                const fileExtension = extname(file.originalname); // Obtiene la extensión del archivo
                const fileName = file.originalname.split(fileExtension)[0]; // Obtiene el nombre sin extensión
                cb(null, `${fileName}-${Date.now()}${fileExtension}`); // Genera un nombre único usando timestamp
            }
        }),
        fileFilter: (req, file, cb) => {
            // Verifica si el tipo de archivo es permitido
            if (MIMETYPES.includes(file.mimetype)) cb(null, true);
            else cb(new Error(`Solamente se aceptan archivos de los siguientes tipos: ${MIMETYPES.join(" ")}`));
        },
        limits: {
            fileSize: MAX_SIZE // Establece el límite de tamaño para los archivos
        }
    });
};

// Exporta una configuración específica para subir fotos de perfil
export const uploadProfilePicture = createMulterConfig("../../public/uploads/profile-pictures");
