import { sindicatoQuery } from "../queries/sindicato.query.js";
import { Payload } from "../helpers/payload.js";
import { response } from "express";

class SindicatoController {
  static payload = new Payload();
  register = async (request, response) => {
    const data = {
      tipoentidadId: request.body.tipoentidadId,
      nombre: request.body.nombre,
      ubicacion: request.body.ubicacion,
      giroId: request.body.giroId,
      representante: request.body.representante,
      telefono: request.body.telefono,
      correo: request.body.correo,
      rfc: request.body.rfc,
      password: request.body.password,
    };
    const query = await sindicatoQuery.create(data);
    if (query) {
      return response.status(200).json({ query });
    } else {
      return response
        .status(400)
        .json({ ok: false, message: "No se pudo registrar" });
    }
  };
  edit = async (request, response) => {
    const id = request.params.id;
    const data = {
      tipoentidadId: request.body.tipoentidadId,
      nombre: request.body.nombre,
      ubicacion: request.body.ubicacion,
      giroId: request.body.giroId,
      representante: request.body.representante,
      telefono: request.body.telefono,
      correo: request.body.correo,
      rfc: request.body.rfc,
      password: request.body.password,
      foto: request.body.foto
    };
    const query = await empresaQuery.update(data, { id: id });
    if (query) {
      return response
        .status(200)
        .json({ ok: true, data: query, message: "registro editado" });
    } else {
      return response
        .status(400)
        .json({ ok: false, message: "No se pudo editar" });
    }
  };
  delete = async (request, response) => {
    const id = request.params.id;
    const query = await sindicatoQuery.delete({ id: id });
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
    const query = await sindicatoQuery.findAll();
    if (query) {
      return response.status(200).json(query.data);
    } else {
      return response
        .status(400)
        .json({ ok: false, message: "No se pudo encontrar" });
    }
  };
  findByPk = async (req, res) => {
    const body = req.body;
    const condition = body.condition;
    const { id } = req.params;
    const query = await sindicatoQuery.findByPk(id, condition);
    if (query.ok) {
      return res.status(200).json(query.data);
    } else {
      return res.status(403).json({ ok: false, message: 'No found' });
    }
  };
  async login(req, res) {
    const { correo, password } = req.body;
    const query = await sindicatoQuery.findOne({ correo, password });

    try {
      if (query.ok) {
        try {
          const token = SindicatoController.payload.createToken(query.data);
          return res.status(200).json({
            empleado: query.data,
            token,
          });
        } catch (error) {
          return res.status(400).json({
            ok: false,
            data: error,
          });
        }
      } else {
        return res.status(400).json({
          ok: false,
          data: null,
          message: 'Correo o contraseña incorrectos',
        });
      }
    } catch (error) {
      return res.status(400).json({
        ok: false,
        data: error,
        message: 'User not found',
      });
    }
  }

}

export const sindicatoController = new SindicatoController();
