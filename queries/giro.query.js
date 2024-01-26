import { GiroModel } from "../models/giro.model.js";

class GiroQuery {
    create = async (data) => {
        try {
            const query = await GiroModel.create(data);
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
            const query = await GiroModel.findAll();
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

export const giroQuery = new GiroQuery();
