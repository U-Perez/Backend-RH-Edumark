import { Model, DataTypes } from "sequelize";
import { DatabaseConfig } from "../config/db.js";
import { SindicatoModel } from "./sindicato.model.js";
import { EmpresaModel } from "./empresa.model.js";
import { UsuarioModel } from "./user.model.js";
import { EmpleadoModel } from "./empleado.model.js";

export class AsesoriaModel extends Model { }

AsesoriaModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        time: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true
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
        },
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: UsuarioModel,
                key: "id"
            }
        },
        empleadoId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: EmpleadoModel,
                key: "id"
            }
        }
    },
    {
        sequelize: DatabaseConfig,
        tableName: "asesoria",
        timestamps: false,
    }
);

AsesoriaModel.belongsTo(SindicatoModel, { as: "entidad" });
AsesoriaModel.belongsTo(EmpresaModel, { as: "empresa" });
AsesoriaModel.belongsTo(UsuarioModel, { as: "usuario" });
AsesoriaModel.belongsTo(EmpleadoModel, { as: "empleado" });