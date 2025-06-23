
import multer from 'multer';

// Configuración de Multer
const storage = multer.memoryStorage();

// Middleware para manejar errores de Multer
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Manejar errores específicos de Multer
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ 
                success: false,
                message: 'El archivo es demasiado grande. El tamaño máximo permitido es 20MB.' 
            });
        }
        // Otros errores de Multer
        return res.status(400).json({ 
            success: false,
            message: `Error al subir el archivo: ${err.message}` 
        });
    } 
    next();
};

// Configuración de Multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 20 * 1024 * 1024, // Límite de 2MB
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de archivo no permitido. Solo se permiten imágenes JPG, JPEG y PNG.'), false);
        }
    }
});
const verifyFile = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ 
            success: false,
            message: "No se subió ningún archivo" 
        });
    }
    next();
};

export { upload, handleMulterError , verifyFile};




