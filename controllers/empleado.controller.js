import { empleadoQuery } from "../queries/empleado.query.js";
import { Payload } from "../helpers/payload.js";

import { transport } from "../helpers/mailer.js";

import jwt from "jsonwebtoken";
import fs from "fs";

class EmpleadoController {
  static payload = new Payload();
  register = async (request, response) => {
    const data = {
      entidadId: request.body.entidadId,
      empresaId: request.body.empresaId,
      nombre: request.body.nombre,
      noColaborador: request.body.noColaborador,
      correo: request.body.correo,
      telefono: request.body.telefono,
      departamento: request.body.departamento,
      puesto: request.body.puesto,
      turno: request.body.turno,
      password: request.body.password,
    };
    const query = await empleadoQuery.create(data);
    if (query) {
      return response.status(200).json(query.data);
    } else {
      return response
        .status(400)
        .json({ ok: false, message: "No se pudo registrar" });
    }
  };
  registerbylink = async (request, response) => {
    const data = {
      entidadId: request.body.entidadId,
      empresaId: request.params.id,
      nombre: request.body.nombre,
      noColaborador: request.body.noColaborador,
      correo: request.body.correo,
      telefono: request.body.telefono,
      departamento: request.body.departamento,
      puesto: request.body.puesto,
      turno: request.body.turno,
      password: request.body.password,
    };
    const query = await empleadoQuery.create(data);
    if (query) {
      return response.status(200).json(query.data);
    } else {
      return response
        .status(400)
        .json({ ok: false, message: "No se pudo registrar" });
    }
  };
  edit = async (request, response) => {
    const id = request.params.id;
    const data = {
      nombre: request.body.nombre,
    };
    const query = await empleadoQuery.update(data, { id: id });
    if (query) {
      return response
        .status(200)
        .json({ ok: true, data: query, message: "registro editado" });
    } else {
      return response
        .status(400)
        .json({ ok: false, message: "No se pudo editar   " });
    }
  };
  delete = async (request, response) => {
    const id = request.params.id;
    const query = await empleadoQuery.delete({ id: id });
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
    const query = await empleadoQuery.findAll();
    if (query) {
      return response.status(200).json(query.data);
    } else {
      return response
        .status(400)
        .json({ ok: false, message: "No se pudo encontrar" });
    }
  };
  async findEmployeeByCompany(req, res) {
    try {
      const id = req.params.id;
      const query = await empleadoQuery.findEmployeeByCompany({
        empresaId: id,
      });
      if (query.ok) {
        return res.status(200).json(query.data);
      } else {
        return res.status(400).json({
          ok: false,
          message: "No se encontraron los empleados de esta empresa",
        });
      }
    } catch (err) {
      console.log("Error al obtener los empleados de la empresa", err);
      return res.status(500).json({
        ok: false,
        message: "Error al obtener los empleados de la empresa  ",
      });
    }
  }
  async findEmployeeByEntidad(req, res) {
    try {
      const id = req.params.id;
      const query = await empleadoQuery.findEmployeeByEntidad({
        entidadId: id,
      });
      if (query.ok) {
        return res.status(200).json(query.data);
      } else {
        return res.status(400).json({
          ok: false,
          message: "No se encontraron los empleados de esta empresa",
        });
      }
    } catch (err) {
      console.log("Error al obtener los empleados de la empresa", err);
      return res.status(500).json({
        ok: false,
        message: "Error al obtener los empleados de la empresa  ",
      });
    }
  }
  async login(req, res) {
    const { correo, password } = req.body;
    const query = await empleadoQuery.findOne({ correo, password });

    try {
      if (query.ok) {
        try {
          const token = EmpleadoController.payload.createToken(query.data);
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
          message: "Correo o contraseña incorrectos",
        });
      }
    } catch (error) {
      return res.status(400).json({
        ok: false,
        data: error,
        message: "User not found",
      });
    }
  }

  async forgotPassword(request, response) {
    const emailTemplate = fs.readFileSync("./html/forgotPassword.html", "utf8");

    const data = {
      correo: request.body.correo,
    };

    const query = await empleadoQuery.resetPassword(data);
    if (query.ok) {
      const secret = process.env.ENCRYPT_KEY + query.data.id;

      const token = jwt.sign(
        { id: query.data.id, correo: query.data.correo },
        secret,
        {
          expiresIn: "5m",
        }
      );
      const link = `http://localhost:8100/reset-password`;
      console.log(link);
      const nombre = query.data.nombre;
      const updatedEmailTemplate = emailTemplate
        .replace("${link}", link)
        .replace("${nombre}", nombre);

      transport.sendMail({
        from: "Noreply  <urias.perezq@gmail.com>  ",
        to: data.correo,
        subject: "Cambio de contraseña ",
        html: updatedEmailTemplate,
      });

      response.status(200).json({ ok: true, data: query, token: token });
    } else {
      response
        .status(404)
        .json({ ok: false, message: "no  se encontro el correo " });
      console.log("no existe el correo ");
    }
  }

  async resetPassword(request, response) {
    const data2 = {
      password: request.body.password,
      token: request.body.token,
    };

    const data = {
      password: data2.password,
    };

    const id = request.params.id;

    console.log(id, data.token);

    const query2 = await empleadoQuery.findUser({ id: id });
    if (query2.ok) {
      const secret = process.env.ENCRYPT_KEY + query2.data.id;

      try {
        const verify = jwt.verify(data2.token, secret);

        const query = await empleadoQuery.update(data, { id: id });
        if (query.ok) {
          response
            .status(200)
            .json({ ok: true, data: query, correo: verify.correo });
        } else {
          response.status(404).json({ ok: false, data: null });
        }
      } catch (error) {
        response.status(404).json({ ok: false, message: "Expiro Link  " });
      }
    }
  }
}

export const empleadoController = new EmpleadoController();
