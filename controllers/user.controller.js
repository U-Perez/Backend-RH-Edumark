import { userQuery } from "../queries/user.query.js";
import { Payload } from "../helpers/payload.js";

class UserController {
    static payload = new Payload();
    register = async (request, response) => {
        const data = {
            nombre: request.body.nombre,
            correo: request.body.correo,
            password: request.body.password,
            empresaId: request.body.empresaId,
            entidadId: request.body.entidadId,
        };
        const query = await userQuery.create(data);
        if (query) {
            return response.status(200).json(query);
        } else {
            return response.status(400).json({
                message: "Error al registrar la empresa",
            });
        }
    };
    delete = async (request, response) => {
        const id = request.params.id;
        const query = await userQuery.delete({ id: id });
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
    edit = async (request, response) => {
        const id = request.params.id;
        const data = {
            entidadId: request.body.entidadId,
            empresaId: request.body.empresaId,
            nombre: request.body.nombre,
            correo: request.body.correo,
            password: request.body.password,
        };
        const query = await userQuery.update(data, { id: id });
        if (query) {
            return response
                .status(200)
                .json({ ok: true, data: query, message: "registro editado" });
        } else {
            return response
                .status(400)
                .json({ ok: false, message: "No se pudo editar" });
        }
    };
    findAll = async (request, response) => {
        const query = await userQuery.findAll();
        if (query) {
            return response.status(200).json(query.data);
        } else {
            return response
                .status(400)
                .json({ ok: false, message: "No se pudo encontrar" });
        }
    };
    async findEmployeeByCompany(req, res) {
        try {
            const id = req.params.id;
            const query = await userQuery.findEmployeeByCompany({ empresaId: id });
            if (query.ok) {
                return res.status(200).json(query.data);
            } else {
                return res.status(400).json({ ok: false, message: "No se encontraron los empleados de esta empresa" });
            }
        } catch (err) {
            console.log('Error al obtener los empleados de la empresa', err);
            return res.status(500).json({ ok: false, message: "Error al obtener los empleados de la empresa" });
        }
    }
    async findEmployeeByEntidad(req, res) {
        try {
            const id = req.params.id;
            const query = await userQuery.findEmployeeByEntidad({ entidadId: id });
            if (query.ok) {
                return res.status(200).json(query.data);
            } else {
                return res.status(400).json({ ok: false, message: "No se encontraron los empleados de esta entidad" });
            }
        } catch (err) {
            console.log('Error al obtener los empleados de la entidad', err);
            return res.status(500).json({ ok: false, message: "Error al obtener los empleados de la entidad" });
        }
    }
    async login(req, res) {
        const { correo, password } = req.body;
        const query = await userQuery.findOne({ correo, password });

        try {
            if (query.ok) {
                try {
                    const token = UserController.payload.createToken(query.data);
                    return res.status(200).json({
                        empresa: query.data,
                        token,
                    });
                } catch (error) {
                    return res.status(400).json({
                        ok: false,
                        data: error,
                    });
                }
            } else {
                return res.status(400).json({
                    ok: false,
                    data: null,
                    message: 'Correo o contraseña incorrectos',
                    data: error,
                });
            }
        } catch (error) {
            return res.status(400).json({
                ok: false,
                data: error,
                message: 'User not found',
            });
        }
    }
}

export const userController = new UserController();
