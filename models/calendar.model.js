import { Model, DataTypes } from "sequelize";
import { DatabaseConfig } from "../config/db.js";
import { SindicatoModel } from "./sindicato.model.js";
import { EmpresaModel } from "./empresa.model.js";

export class CalendarModel extends Model {}

CalendarModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    start: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    end: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    empresaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: EmpresaModel,
        key: "id",
      },
    },
    entidadId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: SindicatoModel,
        key: "id",
      },
    },
  },
  {
    sequelize: DatabaseConfig,
    tableName: "calendar",
    timestamps: false,
  }
);

CalendarModel.belongsTo(EmpresaModel, { as: "empresa" });
CalendarModel.belongsTo(SindicatoModel, { as: "entidad" });
