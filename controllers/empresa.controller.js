import { empresaQuery } from "../queries/empresa.query.js";
import { Payload } from "../helpers/payload.js";

class EmpresaController {
  static payload = new Payload();
  register = async (request, response) => {
    const data = {
      entidadId: request.body.entidadId,
      nombre: request.body.nombre,
      giroId: request.body.giroId,
      ubicacion: request.body.ubicacion,
      representante: request.body.representante,
      telefono: request.body.telefono,
      correo: request.body.correo,
      rfc: request.body.rfc,
      password: request.body.password,
    };
    const query = await empresaQuery.create(data);
    if (query) {
      return response.status(200).json(query);
    } else {
      return response.status(400).json({
        message: "Error al registrar la empresa",
      });
    }
  };
  findByPk = async (req, res) => {
    const body = req.body;
    const condition = body.condition;
    const { id } = req.params;
    const query = await empresaQuery.findByPk(id, condition);
    if (query.ok) {
      return res.status(200).json(query.data);
    } else {
      return res.status(403).json({ ok: false, message: 'No found' });
    }
  };

  edit = async (request, response) => {
    const id = request.params.id;
    const data = {
      entidadId: request.body.entidadId,
      nombre: request.body.nombre,
      giroId: request.body.giroId,
      ubicacion: request.body.ubicacion,
      representante: request.body.representante,
      telefono: request.body.telefono,
      correo: request.body.correo,
      rfc: request.body.rfc,
      password: request.body.password,
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
    const query = await empresaQuery.delete({ id: id });
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
    const query = await empresaQuery.findAll();
    if (query) {
      return response.status(200).json(query.data);
    } else {
      return response
        .status(400)
        .json({ ok: false, message: "No se pudo encontrar" });
    }
  };
  Onlyname = async (request, response) => {
    const query = await empresaQuery.findAll();
    if (query) {
      return response.status(200).json({ ok: true, data: query.data });
    } else {
      return response
        .status(400)
        .json({ ok: false, message: "No se pudo encontrar" });
    }
  };

  async login(req, res) {
    const { correo, password } = req.body;
    const query = await empresaQuery.findLogin({ correo, password });

    try {
      if (query.ok) {
        try {
          const token = EmpresaController.payload.createToken(query.data);
          return res.status(200).json({
            empresa: query.data,
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
          data: error,
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

export const empresaController = new EmpresaController();
