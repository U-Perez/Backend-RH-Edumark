import { Model, DataTypes } from "sequelize";
import { DatabaseConfig } from "../config/db.js";
import { SindicatoModel } from "./sindicato.model.js";
import { EmpresaModel } from "./empresa.model.js";

export class UsuarioModel extends Model { }

UsuarioModel.init(
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
        correo: {
            type: DataTypes.STRING(255),
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
        tableName: "user",
        timestamps: false,
    }
);

UsuarioModel.belongsTo(SindicatoModel, { as: "entidad" });
UsuarioModel.belongsTo(EmpresaModel, { as: "empresa" });