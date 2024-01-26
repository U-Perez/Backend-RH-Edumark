import { EmpresaModel } from "../models/empresa.model.js";

class EmpresaQuery {
  create = async (data) => {
    try {
      const query = await EmpresaModel.create(data);
      if (query) {
        return { query };
      } else {
        return { ok: false, data: null };
      }
    } catch (err) {
      return { ok: false, data: null, err };
    }
  };
  update = async (data, condition = {}) => {
    try {
      const query = await EmpresaModel.update(data, {
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
      const query = await EmpresaModel.destroy({
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
  OnlyName = async () => {
    try {
      const query = await EmpresaModel.findAll({
        attributes: ["id", "nombre"],
        include: [
          {
            model: SindicatoModel,
            attributes: ["nombre"],
          },
        ],
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
      const query = await EmpresaModel.findAll();
      if (query) {
        return { ok: true, data: query };
      } else {
        return { ok: false, data: null };
      }
    } catch (err) {
      return { ok: false, data: null };
    }
  };

  findLogin = async (condition) => {
    try {
      const query = await EmpresaModel.findOne({ where: { correo: condition.correo } });
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
      const query = await EmpresaModel.findByPk(id);
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

export const empresaQuery = new EmpresaQuery();
