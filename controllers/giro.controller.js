import { giroQuery } from "../queries/giro.query.js";

class GiroController {

    findAll = async (request, response) => {
        const query = await giroQuery.findAll();
        if (query) {
            return response.status(200).json(query.data);
        } else {
            return response
                .status(400)
                .json({ ok: false, message: "No se pudo encontrar" });
        }
    };
}

export const giroController = new GiroController();
