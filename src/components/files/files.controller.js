
import sharp from "sharp";
import supabase from "../../config/supabase.js";
import * as serviceUser from "../users/service.user.js";

const uploadUserImage = async (req, res) => {
    const file = req.file;
    const { id } = req.decoded;

    try {
        // Convertir el archivo a .webp
        const image = await sharp(file.buffer)
            .resize({ width: 1080 })
            .webp({ quality: 100 })
            .toBuffer();

        const filePath = `users/${id}.webp`;

        
        // Subir a Supabase
        const { data, error } = await supabase.storage.from("avatars").upload(filePath, image, {
            cacheControl: "3600",
            upsert: true
        });

        if (error) {
            return res.status(500).json({
                message: "Error al subir la imagen",
                error: error.message
            });
        }
        const user = await serviceUser.patchUser({ data: { user_image: filePath }, id });

        if (user) return res.status(200).json({ message: "Image uploaded successfully" });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}


const uploadUserImages = async (req, res) => {
    const files = req.files;
    const { id } = req.decoded;
    const errorImages = [];
    const successImages = [];

    if (!files || files.length === 0) {
        return res.status(400).json({ message: "No se subieron archivos" });
    }


    try {
        // Procesar cada archivo secuencialmente
        for (const file of files) {
            console.log(file);
            const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
            if (!allowedMimeTypes.includes(file.mimetype)) return res.status(400).json({ message: "Invalid file type" });
            try {
                // Convertir la imagen a webp
                const webpbuffer = await sharp(file.buffer)
                    .resize({ width: 1080 })
                    .webp({ quality: 80 })
                    .toBuffer();

                // Crear un nombre de archivo único usando timestamp
                const timestamp = Date.now();
                const fileName = file.originalname.split('.')[0];
                const filePath = `images_${id}/${fileName}_${timestamp}.webp`;

                // Subir a Supabase
                const { error } = await supabase.storage
                    .from("avatars")
                    .upload(filePath, webpbuffer, {
                        cacheControl: '3600',
                        upsert: false // Evita sobrescribir archivos existentes
                    });

                if (error) {
                    console.error(`Error al subir ${file.originalname}:`, error.message);
                    errorImages.push({
                        name: file.originalname,
                        error: error.message
                    });
                } else {
                    successImages.push({
                        name: file.originalname,
                        path: filePath
                    });
                }
            } catch (error) {
                console.error(`Error procesando ${file.originalname}:`, error);
                errorImages.push({
                    name: file.originalname,
                    error: 'Error procesando la imagen'
                });
            }
        }

        // Preparar respuesta
        const response = {
            message: "Proceso de carga completado",
            success: successImages.length > 0,
            successCount: successImages.length,
            errorCount: errorImages.length,
            successFiles: successImages,
            errorFiles: errorImages
        };

        // Si hay errores pero también éxitos, devolver 207 (Partial Content)
        if (errorImages.length > 0 && successImages.length > 0) {
            return res.status(207).json(response);
        }
        // Si todos fallaron
        if (errorImages.length > 0) {
            return res.status(400).json({
                ...response,
                message: "No se pudo subir ningún archivo"
            });
        }
        // Si todo salió bien
        return res.status(200).json({
            ...response,
            message: "Todos los archivos se subieron correctamente"
        });

    } catch (err) {
        return res.status(500).json({
            message: "Error interno del servidor",
            error: err.message
        });
    }
}
export default { uploadUserImage, uploadUserImages }