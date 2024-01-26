import { Model, DataTypes } from "sequelize";
import { DatabaseConfig } from "../config/db.js";
import { PuestoModel } from "./puesto.model.js";

export class DepartamentoModel extends Model { }

DepartamentoModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name_departamento: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize: DatabaseConfig,
    tableName: "departamentos",
    timestamps: false,
  }
);

// Crear la tabla intermedia para representar la relación Many-to-Many
// export const DepartamentoPuesto = DatabaseConfig.define("DepartamentoPuesto", {});

// Establecer la relación Many-to-Many entre PuestoModel y DepartamentoModel
// PuestoModel.belongsToMany(DepartamentoModel, {
//   through: DepartamentoPuesto,
//   as: "departamentos",
//   foreignKey: "puestoId",
// });
// DepartamentoModel.belongsToMany(PuestoModel, {
//   through: DepartamentoPuesto,
//   as: "puestos",
//   foreignKey: "departamentoId",
// });