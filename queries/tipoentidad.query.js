import { TipoEntidadModel } from "../models/tipoentidad.model.js";

class TipoEntidadQuery {
    create = async (data) => {
        try {
            const query = await TipoEntidadModel.create(data);
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
            const query = await TipoEntidadModel.findAll();
            if (query) {
                return { ok: true, data: query };
            } else {
                return { ok: false, data: null };
            }
        } catch (err) {
            return { ok: false, data: null };
        }
    };

}

export const tipoentidadQuery = new TipoEntidadQuery();
