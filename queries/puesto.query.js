import { PuestoModel } from "../models/puesto.model.js";

class PuestoQuery {
    create = async (data) => {
        try {
            const query = await PuestoModel.create(data);
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
            const query = await PuestoModel.findAll();
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

export const puestoQuery = new PuestoQuery();
