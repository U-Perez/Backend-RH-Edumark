import { SindicatoModel } from "../models/sindicato.model.js";
import { GiroModel } from "../models/giro.model.js";

class SindicatoQuery {
  create = async (data) => {
    try {
      const query = await SindicatoModel.create(data);
      if (query) {
        return { query };
      } else {
        return { ok: false, data: null };
      }
    } catch (err) {
      return { ok: false, data: null };
    }
  };
  update = async (data, condition = {}) => {
    try {
      const query = await SindicatoModel.update(data, {
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
      const query = await SindicatoModel.destroy({
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
      const query = await SindicatoModel.findAll({ include: ['giro', 'tipoentidad'] });
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
      const query = await SindicatoModel.findOne({ where: { correo: condition.correo } });
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
  findByPk = async (id) => {
    try {
      const query = await SindicatoModel.findByPk(id);
      if (query) {
        return { ok: true, data: query };
      } else {
        return { ok: false, data: null };
      }
    } catch (e) {
      console.log('Error al ejecutar query', e);
      return { ok: false, data: null };
    }
  };
}

export const sindicatoQuery = new SindicatoQuery();
