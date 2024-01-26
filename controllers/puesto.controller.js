import { puestoQuery } from "../queries/puesto.query.js";

class PuestoController {

    findAll = async (request, response) => {
        const query = await puestoQuery.findAll();
        if (query) {
            return response.status(200).json(query.data);
        } else {
            return response
                .status(400)
                .json({ ok: false, message: "No se pudo encontrar" });
        }
    };
}

export const puestoController = new PuestoController();
