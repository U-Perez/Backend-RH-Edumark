import { Model, DataTypes } from "sequelize";
import { DatabaseConfig } from "../config/db.js";
import { GiroModel } from "./giro.model.js";
import { TipoEntidadModel } from "./tipoentidad.model.js";

export class SindicatoModel extends Model { }

SindicatoModel.init(
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
    password: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    giroId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: GiroModel,
        key: "id"
      }
    },
    tipoentidadId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TipoEntidadModel,
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
    tableName: "entidad",
    timestamps: false,
  }
);

SindicatoModel.belongsTo(GiroModel, { as: "giro" });
SindicatoModel.belongsTo(TipoEntidadModel, { as: "tipoentidad" });