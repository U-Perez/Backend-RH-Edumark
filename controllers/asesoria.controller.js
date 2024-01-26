import { asesoriaQuery } from "../queries/asesoria.query.js";
import { Payload } from "../helpers/payload.js";

class AsesoriaController {
    static payload = new Payload();
    register = async (request, response) => {
        const data = {
            entidadId: request.body.entidadId,
            empresaId: request.body.empresaId,
            usuarioId: request.body.usuarioId,
            empleadoId: request.body.empleadoId,
            comment: request.body.comment,
            title: request.body.title,
            description: request.body.description,
            status: request.body.status,
            time: request.body.time
        };
        const query = await asesoriaQuery.create(data);
        if (query) {
            return response.status(200).json(query.data);
        } else {
            return response
                .status(400)
                .json({ ok: false, message: "No se pudo registrar" });
        }
    };
    edit = async (request, response) => {
        const id = request.params.id;
        const data = {
            entidadId: request.body.entidadId,
            empresaId: request.body.empresaId,
            usuarioId: request.body.usuarioId,
            empleadoId: request.body.empleadoId,
            comment: request.body.comment,
            title: request.body.title,
            description: request.body.description,
            status: request.body.status,
            time: request.body.time
        };
        const query = await asesoriaQuery.update(data, { id: id });
        if (query) {
            return response
                .status(200)
                .json({ query, message: "registro editado" });
        } else {
            return response
                .status(400)
                .json({ ok: false, message: "No se pudo editar   " });
        }
    };
    delete = async (request, response) => {
        const id = request.params.id;
        const query = await asesoriaQuery.delete({ id: id });
        if (query) {
            return response
                .status(200)
                .json({ ok: true, data: query, message: "registro eliminado" });
        } else {
            return response
                .status(400)
                .json({ ok: false, message: "No se pudo eliminar" });
        }
    };
    findAsesoriaByPK = async function (req, res) {
        try {
            const id = req.params.id;
            const query = await asesoriaQuery.findByPK(id);
            if (query.ok) {
                return res.status(200).json(query.data);
            } else {
                return res.status(404).json({ ok: false, message: 'Blog no encontrado' });
            }
        } catch (err) {
            console.log('Error al obtener el blog por ID', err);
            return res.status(500).json({ ok: false, message: 'Error al obtener el blog por ID' });
        }
    }
    findAll = async (request, response) => {
        const query = await asesoriaQuery.findAll();
        if (query) {
            return response.status(200).json(query.data);
        } else {
            return response
                .status(400)
                .json({ ok: false, message: "No se pudo encontrar" });
        }
    };
    async findAsesoriaByCompany(req, res) {
        try {
            const id = req.params.id;
            const query = await asesoriaQuery.findAsesoriaByCompany({ empresaId: id });
            if (query.ok) {
                return res.status(200).json(query.data);
            } else {
                return res.status(400).json({ ok: false, message: "No se encontraron los blogs de esta empresa" });
            }
        } catch (err) {
            console.log('Error al obtener los blogs de la empresa', err);
            return res.status(500).json({ ok: false, message: "Error al obtener los blogs de la empresa" });
        }
    }
    async findAsesoriaByEntidad(req, res) {
        try {
            const id = req.params.id;
            const query = await asesoriaQuery.findAsesoriaByEntidad({ entidadId: id });
            if (query.ok) {
                return res.status(200).json(query.data);
            } else {
                return res.status(400).json({ ok: false, message: "No se encontraron los blogs de esta empresa" });
            }
        } catch (err) {
            console.log('Error al obtener los blogs de la empresa', err);
            return res.status(500).json({ ok: false, message: "Error al obtener los blogs de la empresa" });
        }
    }
}

export const asesoriaController = new AsesoriaController();
