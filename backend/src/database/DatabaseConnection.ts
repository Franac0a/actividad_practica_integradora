import { Sequelize } from "sequelize";
import "dotenv/config";

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private sequelize: Sequelize;

  private constructor() {
    const dbName = process.env.DB_NAME || "tp_integrador";
    const dbUser = process.env.DB_USER || "tlp4";
    const dbPassword = process.env.DB_PASSWORD || "tlp4";
    const dbHost = process.env.DB_HOST || "localhost";
    const dbPort = Number(process.env.DB_PORT) || 5432;

    this.sequelize = new Sequelize(dbName, dbUser, dbPassword, {
      host: dbHost,
      dialect: "postgres",
      port: dbPort,
      logging: false,
    });
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public getSequelize(): Sequelize {
    return this.sequelize;
  }

  public async connect(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log("✅ Conexión a PostgreSQL establecida usando Singleton.");
    } catch (error) {
      console.error("Error conectando a la base de datos:", error);
    }
  }
}
