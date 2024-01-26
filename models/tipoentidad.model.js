import { Model, DataTypes } from "sequelize";
import { DatabaseConfig } from "../config/db.js";

export class TipoEntidadModel extends Model { }

TipoEntidadModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
  },
  {
    sequelize: DatabaseConfig,
    tableName: "tipoentidad",
    timestamps: false,
  }
);
