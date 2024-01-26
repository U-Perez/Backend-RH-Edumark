import { Model, DataTypes } from "sequelize";
import { DatabaseConfig } from "../config/db.js";
import { SindicatoModel } from "./sindicato.model.js";
import { GiroModel } from "./giro.model.js";
import { DepartamentoModel } from "./departamento.model.js";
import { PuestoModel } from "./puesto.model.js";

export class EmpresaModel extends Model { }

EmpresaModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ubicacion: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    representante: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rfc: {
      type: DataTypes.STRING(13),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    giroId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: GiroModel,
        key: "id"
      }
    },
    entidadId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: SindicatoModel,
        key: "id"
      }
    },
    foto: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
  },
  {
    sequelize: DatabaseConfig,
    tableName: "empresa",
    timestamps: false,
  }
);

EmpresaModel.belongsTo(SindicatoModel, { as: "entidad" });
EmpresaModel.belongsTo(GiroModel, { as: "giro" });

// EmpresaModel.hasMany(DepartamentoModel, {
//   foreignKey: "empresaId",
//   as: "departamentos",
// });

// EmpresaModel.hasMany(PuestoModel, {
//   foreignKey: "empresaId",
//   as: "puestos",
// });