import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const DatabaseConfig = new Sequelize({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DB_DIALECT,
  timezone: "-06:00",
  port: process.env.DB_PORT,
  logging: false,
});

export class Database {
  connection = async () => {
    try {
      //true (borra las tablas y la vuelve a crear), false (mantiene todo como se genero)
      await DatabaseConfig.sync({ force: false });
      return { ok: true, message: "conexion establecido a BD " };
    } catch (e) {
      return { ok: false, message: "conexion no establecido", e };
    }
  };
}
