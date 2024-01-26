import { Model, DataTypes } from "sequelize";
import { DatabaseConfig } from "../config/db.js";

export class PuestoModel extends Model { }

PuestoModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name_puesto: {
      type: DataTypes.STRING(255),
      allowNull: false,
    }
  },
  {
    sequelize: DatabaseConfig,
    tableName: "puestos",
    timestamps: false,
  }
);
