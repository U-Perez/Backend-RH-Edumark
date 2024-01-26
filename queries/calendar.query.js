import { CalendarModel } from "../models/calendar.model.js";
import { BlogModel } from "../models/blog.model.js";

class CalendarQuery {
  create = async (title, start, end) => {
    try {
      const query = await CalendarModel.create(title, start, end);
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
      const query = await CalendarModel.destroy({
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
      const query = await CalendarModel.findAll();
      if (query) {
        return { ok: true, data: query };
      } else {
        return { ok: false, data: null };
      }
    } catch (err) {
      return { ok: false, data: null };
    }
  };

  findCalendarByCompany = async (condition) => {
    try {
      const query = await CalendarModel.findAll({
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

  findCalendarByEntidad = async (condition) => {
    try {
      const query = await CalendarModel.findAll({
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

export const calendarQuery = new CalendarQuery();
