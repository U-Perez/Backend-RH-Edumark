import { blogQuery } from "../queries/blog.query.js";
import { Payload } from "../helpers/payload.js";

class BlogController {
    static payload = new Payload();
    register = async (request, response) => {
        const data = {
            entidadId: request.body.entidadId,
            empresaId: request.body.empresaId,
            content: request.body.content,
            title: request.body.title,
            description: request.body.description
        };
        const query = await blogQuery.create(data);
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
            nombre: request.body.nombre,
        };
        const query = await blogQuery.update(data, { id: id });
        if (query) {
            return response
                .status(200)
                .json({ ok: true, data: query, message: "registro editado" });
        } else {
            return response
                .status(400)
                .json({ ok: false, message: "No se pudo editar   " });
        }
    };
    delete = async (request, response) => {
        const id = request.params.id;
        const query = await blogQuery.delete({ id: id });
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
    findBlogByPK = async function (req, res) {
        try {
            const id = req.params.id;
            const query = await blogQuery.findByPK(id);
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
        const query = await blogQuery.findAll();
        if (query) {
            return response.status(200).json(query.data);
        } else {
            return response
                .status(400)
                .json({ ok: false, message: "No se pudo encontrar" });
        }
    };
    async findBlogByCompany(req, res) {
        try {
            const id = req.params.id;
            const query = await blogQuery.findBlogByCompany({ empresaId: id });
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
    async findBlogByEntidad(req, res) {
        try {
            const id = req.params.id;
            const query = await blogQuery.findBlogByEntidad({ entidadId: id });
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

export const blogController = new BlogController();
