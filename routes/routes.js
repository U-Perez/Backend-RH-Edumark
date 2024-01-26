import express from "express";
import { sindicatoController } from "../controllers/sindicato.controller.js";
import { empresaController } from "../controllers/empresa.controller.js";
import { empleadoController } from "../controllers/empleado.controller.js";
import { tipoentidadController } from "../controllers/tipoentidad.controller.js";
import { giroController } from "../controllers/giro.controller.js";
import { departamentoController } from "../controllers/departamentos.controller.js";
import { puestoController } from "../controllers/puesto.controller.js";
import { userController } from "../controllers/user.controller.js";
import { uploadImage } from "../controllers/uploadImage.controller.js";
import { uploadProfileImage } from "../controllers/uploadProfileImg.controller.js";
import { uploadProfileImageEntidad } from "../controllers/uploadProfileImg.controller.js";
import { blogController } from "../controllers/blog.controller.js";
import { asesoriaController } from "../controllers/asesoria.controller.js";

import { calendarController } from "../controllers/calendar.controller.js";

import { transport } from "../helpers/mailer.js";
export class Routes {
  routes(app = express.application) {
    app.get("/", (req, res) => {
      res.send("Welcome");
    });
    // Rutas para Entidad
    app.post("/entidad", sindicatoController.register);
    app.post("/entidad/login", sindicatoController.login);
    app.route("/entidad/:id").put(sindicatoController.edit);
    app.route("/entidad/:id").delete(sindicatoController.delete);
    app.get("/entidad", sindicatoController.findAll);
    app.get("/entidad/:id", sindicatoController.findByPk);
    app.post("/entidad/image/:id", uploadProfileImageEntidad);

    // Rutas para  Empresa
    app.post("/empresa", empresaController.register);
    app.post("/empresa/login", empresaController.login);
    app.get("/empresa", empresaController.findAll);
    app.route("/empresa/:id").get(empresaController.findByPk);
    app.route("/empresa/:id").put(empresaController.edit);
    app.route("/empresa/:id").delete(empresaController.delete);
    app.post("/empresa/image/:id", uploadProfileImage);


    // Rutas    xc<para Empleados
    app.post("/empleado", empleadoController.register);
    app.get("/empleado", empleadoController.findAll);
    app.route("/empleado/:id").put(empleadoController.edit);
    app.route("/empleado/:id").delete(empleadoController.delete);
    app.get("/empleado/empresa/:id", empleadoController.findEmployeeByCompany);
    app.get("/empleado/entidad/:id", empleadoController.findEmployeeByEntidad);
    app.post("/empleado/register/:id", empleadoController.registerbylink);
    app.post("/empleado/login", empleadoController.login);
    //app.route("/empleado/empresa/:id").post(empleadoController.findEmployeeByCompany)

    // Rutas para tipo de entidad
    app.get("/tipoentidad", tipoentidadController.findAll);

    // Rutas para giros
    app.get("/giro", giroController.findAll);

    // Rutas para departamentos
    app.get("/departamento", departamentoController.findAll);

    // Rutas para puestos
    app.get("/puesto", puestoController.findAll);

    // Rutas para users
    app.route("/user").post(userController.register);
    app.get("/user", userController.findAll);
    app.post("/user/login", userController.login);
    app.route("/user/:id").put(userController.edit);
    app.route("/user/:id").delete(userController.delete);
    app.get("/user/empresa/:id", userController.findEmployeeByCompany);
    app.get("/user/entidad/:id", userController.findEmployeeByEntidad);

    //Rutas para blogs
    app.post("/blog", blogController.register);
    app.get("/blog", blogController.findAll);
    app.get("/blog/:id", blogController.findBlogByPK);
    app.get("/blog/empresa/:id", blogController.findBlogByCompany);
    app.get("/blog/entidad/:id", blogController.findBlogByEntidad);
    app.delete("/blog/:id", blogController.delete);

    // Ruta para subir imagenes
    app.post("/upload-image", uploadImage);

    // Ruta para eventos
    app.post("/calendar", calendarController.register);
    app.get("/calendar", calendarController.findAll);
    app.delete("/calendar/:id", calendarController.delete);
    app.get("/calendar/empresa/:id", calendarController.findCalendarByCompany);

    app.post("/calendar/entidad", calendarController.register);
    app.delete("/calendar/entidad/:id", calendarController.delete);
    app.get("/calendar/entidad/:id", calendarController.findCalendarByEntidad);

    app.post("/forgot-password", empleadoController.forgotPassword);
    app.post("/reset-password/:id", empleadoController.resetPassword);

    // Rutas para asesorias
    app.post("/consulting", asesoriaController.register);
    app.get("/consulting", asesoriaController.findAll);
    app.delete("/consulting/:id", asesoriaController.delete);
    app.route("/consulting/:id").put(asesoriaController.edit);
    app.get("/consulting/empresa/:id", asesoriaController.findAsesoriaByCompany);
    app.get("/consulting/entidad/:id", asesoriaController.findAsesoriaByEntidad);

  }
}
