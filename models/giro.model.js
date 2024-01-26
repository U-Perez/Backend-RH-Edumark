import { Model, DataTypes } from "sequelize";
import { DatabaseConfig } from "../config/db.js";

export class GiroModel extends Model { }

GiroModel.init(
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
    tableName: "giro",
    timestamps: false,
  }
);
