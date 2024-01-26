import { BlogModel } from "../models/blog.model.js";

class BlogQuery {
    create = async (data) => {
        try {
            const query = await BlogModel.create(data);
            if (query) {
                return { ok: true, data: query };
            } else {
                return { ok: false, data: null };
            }
        } catch (err) {
            return { ok: false, data: null };
        }
    };
    find = async (condition = {}) => {
        try {
            const query = await BlogModel.findOne({
                where: { correo: condition.correo },
            });
            if (query) {
                return { ok: true, data: query };
            } else {
                return { ok: false, data: null };
            }
        } catch (err) {
            return { ok: false, data: null };
        }
    };
    update = async (data, condition = {}) => {
        try {
            const query = await BlogModel.update(data, {
                where: { id: condition.id },
            });
            if (query) {
                return { ok: true, data: query };
            } else {
                return { ok: false, data: null };
            }
        } catch (err) {
            return { ok: false, data: null };
        }
    };
    delete = async (condition = {}) => {
        try {
            const query = await BlogModel.destroy({
                where: { id: condition.id },
            });
            if (query) {
                return { ok: true, data: query };
            } else {
                return { ok: false, data: null };
            }
        } catch (err) {
            return { ok: false, data: null };
        }
    };
    findAll = async () => {
        try {
            const query = await BlogModel.findAll();
            if (query) {
                return { ok: true, data: query };
            } else {
                return { ok: false, data: null };
            }
        } catch (err) {
            return { ok: false, data: null };
        }
    };

    findOne = async (condition) => {
        try {
            const query = await BlogModel.findOne({ where: { id: condition.id } });
            if (query) {
                const Blog = query.get(); // Obtener los datos del Blog
                return { ok: true, data: Blog };
            } else {
                return { ok: false, data: null };
            }
        } catch (err) {
            console.log('Error al ejecutar query', err);
            return { ok: false, data: null, err };
        }
    };

    findByPK = async (id) => {
        try {
            const query = await BlogModel.findByPk(id);
            if (query) {
                return { ok: true, data: query };
            } else {
                return { ok: false, data: null };
            }
        } catch (err) {
            console.log('Error al ejecutar la consulta', err);
            return { ok: false, data: null, err };
        }
    };

    findBlogByCompany = async (condition) => {
        try {
            const query = await BlogModel.findAll({
                where: { empresaId: condition.empresaId },
                order: [['id', 'DESC']], // Ordena por ID de forma descendente (mayor a menor)
            });

            if (query.length > 0) {
                return { ok: true, data: query };
            } else {
                return { ok: false, data: null };
            }
        } catch (err) {
            console.log('Error al ejecutar la consulta', err);
            return { ok: false, data: null, err };
        }
    };
    findBlogByEntidad = async (condition) => {
        try {
            const query = await BlogModel.findAll({
                where: { entidadId: condition.entidadId },
                order: [['id', 'DESC']], // Ordena por ID de forma descendente (mayor a menor)
            });

            if (query.length > 0) {
                return { ok: true, data: query };
            } else {
                return { ok: false, data: null };
            }
        } catch (err) {
            console.log('Error al ejecutar la consulta', err);
            return { ok: false, data: null, err };
        }
    };

}

export const blogQuery = new BlogQuery();
