import dotenv from 'dotenv';

// Seleccion de entorno de trabajo, si se indica "development" utiliza el entorno de Developer
// que conecta a la database MongoDB
// Si se indica otra cosa que no sea "development", la app inicializa en el entorno "production"
// (ACLARACION: por ahora "production" tambien funciona en un entorno de MongoDB, creando una nueva Coleccion para el desarrollo)

const environment = 'development'; // Cambiar a 'production' para usar el otro entorno

// Carga el archivo .env correspondiente al entorno
dotenv.config({ path: environment === "development" ? "./.env.development" : "./.env.production", });

export { environment };

export default {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  MAILING_EMAIL: process.env.MAILING_EMAIL,
  MAILING_PASSWORD: process.env.MAILING_PASSWORD,
};