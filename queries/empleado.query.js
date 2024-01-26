import { EmpleadoModel } from "../models/empleado.model.js";
class EmpleadoQuery {
  create = async (data) => {
    try {
      const query = await EmpleadoModel.create(data);
      if (query) {
        return { ok: true, data: query };
      } else {
        return { ok: false, data: null };
      }
    } catch (err) {
      return { ok: false, data: null };
    }
  };
  find = async (condition = {}) => {
    try {
      const query = await EmpleadoModel.findOne({
        where: { correo: condition.correo },
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
  update = async (data, condition = {}) => {
    try {
      const query = await EmpleadoModel.update(data, {
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
      const query = await EmpleadoModel.destroy({
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
      const query = await EmpleadoModel.findAll();
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
      const query = await EmpleadoModel.findOne({
        where: { correo: condition.correo },
      });
      if (query) {
        const empleado = query.get(); // Obtener los datos del empleado

        // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
        if (empleado.password === condition.password) {
          return { ok: true, data: empleado };
        } else {
          return { ok: false, data: null };
        }
      } else {
        return { ok: false, data: null };
      }
    } catch (err) {
      console.log("Error al ejecutar query", err);
      return { ok: false, data: null, err };
    }
  };

  findUser = async (condition) => {
    try {
      const query = await EmpleadoModel.findOne({
        where: { id: condition.id },
      });
      if (query) {
        return { ok: true, data: query };
      } else {
        return { ok: false, data: null };
      }
    } catch (err) {
      console.log("Error al ejecutar query", err);
      return { ok: false, data: null, err };
    }
  };

  resetPassword = async (condition) => {
    try {
      const query = await EmpleadoModel.findOne({
        where: { correo: condition.correo },
      });
      if (query) {
        return { ok: true, data: query };
      } else {
        return { ok: false, data: null };
      }
    } catch (err) {
      console.log("Error al ejecutar query", err);
      return { ok: false, data: null, err };
    }
  };

  findEmployeeByCompany = async (condition) => {
    try {
      const query = await EmpleadoModel.findAll({
        where: { empresaId: condition.empresaId },
      });
      if (query.length > 0) {
        return { ok: true, data: query };
      } else {
        return { ok: false, data: null };
      }
    } catch (err) {
      console.log("Error al ejecutar la consulta", err);
      return { ok: false, data: null, err };
    }
  };

  findEmployeeByEntidad = async (condition) => {
    try {
      const query = await EmpleadoModel.findAll({
        where: { entidadId: condition.entidadId },
      });
      if (query.length > 0) {
        return { ok: true, data: query };
      } else {
        return { ok: false, data: null };
      }
    } catch (err) {
      console.log("Error al ejecutar la consulta", err);
      return { ok: false, data: null, err };
    }
  };
}

export const empleadoQuery = new EmpleadoQuery();
