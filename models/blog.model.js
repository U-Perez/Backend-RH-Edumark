import { Model, DataTypes } from "sequelize";
import { DatabaseConfig } from "../config/db.js";
import { SindicatoModel } from "./sindicato.model.js";
import { EmpresaModel } from "./empresa.model.js";

export class BlogModel extends Model { }

BlogModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
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
        tableName: "blogs",
        timestamps: false,
    }
);

BlogModel.belongsTo(SindicatoModel, { as: "entidad" });
BlogModel.belongsTo(EmpresaModel, { as: "empresa" });