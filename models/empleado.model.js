import { Model, DataTypes } from "sequelize";
import { DatabaseConfig } from "../config/db.js";
import { SindicatoModel } from "./sindicato.model.js";
import { EmpresaModel } from "./empresa.model.js";

export class EmpleadoModel extends Model { }

EmpleadoModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    noColaborador: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    departamento: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    puesto: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    turno: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    empresaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: EmpresaModel,
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
    }
  },
  {
    sequelize: DatabaseConfig,
    tableName: "empleado",
    timestamps: false,
  }
);

EmpleadoModel.belongsTo(SindicatoModel, { as: "entidad" });
EmpleadoModel.belongsTo(EmpresaModel, { as: "empresa" });