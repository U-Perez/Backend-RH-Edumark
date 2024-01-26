import { blogQuery } from "../queries/blog.query.js";
import { Payload } from "../helpers/payload.js";
import { calendarQuery } from "../queries/calendar.query.js";

class CalendarController {
  static payload = new Payload();
  register = async (request, response) => {
    const data = {
      title: request.body.title,
      start: request.body.start,
      end: request.body.end,
      description: request.body.description,
      empresaId: request.body.empresaId,
      entidadId: request.body.entidadId
    };
    const query = await calendarQuery.create(data);
    if (query) {
      return response.status(200).json(query.data);
    } else {
      return response
        .status(400)
        .json({ ok: false, message: "No se pudo registrar" });
    }
  };

  delete = async (request, response) => {
    const id = request.params.id;
    const query = await calendarQuery.delete({ id: id });
    if (query) {
      return response
        .status(200)
        .json({ ok: true, data: query, message: "registro eliminado" });
    } else {
      return response
        .status(400)
        .json({ ok: false, message: "No se pudo eliminar" });
    }
  };
  findAll = async (request, response) => {
    const query = await calendarQuery.findAll();
    if (query) {
      return response.status(200).json(query.data);
    } else {
      return response
        .status(400)
        .json({ ok: false, message: "No se pudo encontrar" });
    }
  };

  async findCalendarByCompany(req, res) {
    try {
      const id = req.params.id;
      const query = await calendarQuery.findCalendarByCompany({
        empresaId: id,
      });
      if (query.ok) {
        return res.status(200).json(query.data);
      } else {
        return res.status(400).json({
          ok: false,
          message: "No se encontro el calendario  de esta empresa",
        });
      }
    } catch (err) {
      console.log("Error al obtener calendario  de la empresa", err);
      return res.status(500).json({
        ok: false,
        message: "Error al obtener el calendario  de la empresa",
      });
    }
  }

  async findCalendarByEntidad(req, res) {
    try {
      const id = req.params.id;
      const query = await calendarQuery.findCalendarByEntidad({
        entidadId: id,
      });
      if (query.ok) {
        return res.status(200).json(query.data);
      } else {
        return res.status(400).json({
          ok: false,
          message: "No se encontro el calendario  de esta empresa",
        });
      }
    } catch (err) {
      console.log("Error al obtener calendario  de la empresa", err);
      return res.status(500).json({
        ok: false,
        message: "Error al obtener el calendario  de la empresa",
      });
    }
  }
}

export const calendarController = new CalendarController();
