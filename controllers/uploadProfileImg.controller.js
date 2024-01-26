import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import { empresaQuery } from "../queries/empresa.query.js";
import { sindicatoQuery } from "../queries/sindicato.query.js";

const s3Client = new S3Client({
    region: "us-east-1", // Cambia a tu región apropiada
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    endpoint: process.env.S3_ENDPOINT,
});

export const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.BUCKET_NAME,
        acl: "public-read",
        metadata: (req, file, cb) => {
            cb(null, {
                fieldName: file.fieldname,
            });
        },
        key: (request, file, cb) => {
            const folder = "profile";   // Ruta de la carpeta específica en tu bucket
            const filename = file.originalname;
            const key = `${folder}/${filename}`; // Combinar la carpeta y el nombre de archivo
            cb(null, key);
        },
    }),
    limits: {
        fileSize: 1024 * 1024 * 10, // 5 MB (ejemplo de límite de tamaño)
    },
}).single("upload");

export async function uploadProfileImage(req, res) {
    try {
        // Carga el archivo utilizando multer y espera a que se complete
        await new Promise((resolve, reject) => {
            upload(req, res, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });

        // Verifica si el archivo fue cargado exitosamente
        if (!req.file) {
            return res.status(400).json({ ok: false, message: "No se ha proporcionado ningún archivo" });
        }

        // Obtiene la URL de la imagen subida
        const imageUrl = `https://${process.env.BUCKET_NAME}.nyc3.digitaloceanspaces.com/${req.file.key}`;
        console.log("URL de la imagen:", imageUrl);

        const id = req.params.id;
        console.log(id);

        const data = {
            foto: imageUrl,
        };

        const query = await empresaQuery.update(data, { id: id });
        if (query) {
            return res
                .status(200)
                .json({ imageUrl });
        } else {
            return res.status(400).json({ ok: false, message: "No se pudo editar" });
        }
    } catch (error) {
        console.error("Error al subir el archivo:", error);
        res.status(500).send("Error al subir el archivo");
    }
}

export async function uploadProfileImageEntidad(req, res) {
    try {
        // Carga el archivo utilizando multer y espera a que se complete
        await new Promise((resolve, reject) => {
            upload(req, res, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });

        // Verifica si el archivo fue cargado exitosamente
        if (!req.file) {
            return res.status(400).json({ ok: false, message: "No se ha proporcionado ningún archivo" });
        }

        // Obtiene la URL de la imagen subida
        const imageUrl = `https://${process.env.BUCKET_NAME}.nyc3.digitaloceanspaces.com/${req.file.key}`;
        console.log("URL de la imagen:", imageUrl);

        const id = req.params.id;
        console.log(id);

        const data = {
            foto: imageUrl,
        };

        const query = await sindicatoQuery.update(data, { id: id });
        if (query) {
            return res
                .status(200)
                .json({ imageUrl });
        } else {
            return res.status(400).json({ ok: false, message: "No se pudo editar" });
        }
    } catch (error) {
        console.error("Error al subir el archivo:", error);
        res.status(500).send("Error al subir el archivo");
    }
}
