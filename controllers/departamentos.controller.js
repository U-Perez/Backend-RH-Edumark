import { departamentoQuery } from "../queries/departamento.query.js";

class DepartamentoController {

    findAll = async (request, response) => {
        const query = await departamentoQuery.findAll();
        if (query) {
            return response.status(200).json(query.data);
        } else {
            return response
                .status(400)
                .json({ ok: false, message: "No se pudo encontrar" });
        }
    };
}

export const departamentoController = new DepartamentoController();
