import express from "express";
import cors from "cors";
import { DatabaseConnection } from "./database/DatabaseConnection";

const app = express();
const port = process.env.API_PORT || 3000;

app.use(cors());
app.use(express.json());

async function bootstrap() {
  // 1. Instanciamos la base de datos usando nuestro Singleton
  const db = DatabaseConnection.getInstance();
  await db.connect();

  // Acá después vamos a inyectar los repositorios y servicios...

  app.listen(port, () => {
    console.log(`Servidor backend corriendo en http://localhost:${port}`);
  });
}

bootstrap();
