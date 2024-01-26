import { tipoentidadQuery } from "../queries/tipoentidad.query.js";

class TipoEntidadController {

    findAll = async (request, response) => {
        const query = await tipoentidadQuery.findAll();
        if (query) {
            return response.status(200).json(query.data);
        } else {
            return response
                .status(400)
                .json({ ok: false, message: "No se pudo encontrar" });
        }
    };
}

export const tipoentidadController = new TipoEntidadController();
