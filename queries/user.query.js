import { UsuarioModel } from "../models/user.model.js";

class UserQuery {
    create = async (data) => {
        try {
            const query = await UsuarioModel.create(data);
            if (query) {
                return { query };
            } else {
                return { ok: false, data: null };
            }
        } catch (err) {
            return { ok: false, data: null, err };
        }
    };
    update = async (data, condition = {}) => {
        try {
            const query = await UsuarioModel.update(data, {
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
            const query = await UsuarioModel.destroy({
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
            const query = await UsuarioModel.findAll();
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
            const query = await UsuarioModel.findOne({ where: { correo: condition.correo } });
            if (query) {
                const entidad = query.get(); // Obtener los datos del entidad

                // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
                if (entidad.password === condition.password) {
                    return { ok: true, data: entidad };
                } else {
                    return { ok: false, data: null };
                }
            } else {
                return { ok: false, data: null };
            }
        } catch (err) {
            console.log('Error al ejecutar query', err);
            return { ok: false, data: null, err };
        }
    };
    findEmployeeByCompany = async (condition) => {
        try {
            const query = await UsuarioModel.findAll({ where: { empresaId: condition.empresaId } });
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
    findEmployeeByEntidad = async (condition) => {
        try {
            const query = await UsuarioModel.findAll({ where: { entidadId: condition.entidadId } });
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

export const userQuery = new UserQuery();
