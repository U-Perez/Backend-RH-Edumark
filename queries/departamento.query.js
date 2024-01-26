import { DepartamentoModel } from "../models/departamento.model.js";

class DepartamentoQuery {
    create = async (data) => {
        try {
            const query = await DepartamentoModel.create(data);
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
            const query = await DepartamentoModel.findAll();
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

export const departamentoQuery = new DepartamentoQuery();
