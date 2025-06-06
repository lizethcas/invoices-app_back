// src/config/postgress.js
import Sequelize from 'sequelize';
import { config } from "./config.js";

// Mostrar información de depuración
// Configuración de la conexión a PostgreSQL
const sequelize = new Sequelize(
  config.POSTGRES_DB,        // Nombre de la base de datos
  config.POSTGRES_USER,      // Usuario para conectarse a la base
  config.POSTGRES_PASSWORD,  // Contraseña del usuario
  {
    host: 'postgres',        // Nombre del host (en este caso, el nombre del servicio en docker-compose)
    port: config.POSTGRES_PORT, // Puerto en el que escucha PostgreSQL
    dialect: 'postgres',     // Motor de base de datos (puede ser mysql, sqlite, etc.)
    logging: true,           // Activamos el logging para ver las consultas SQL en la consola
    pool: {                  // Configuración del pool de conexiones
      max: 5,                // Máximo de conexiones simultáneas
      min: 0,                // Mínimo de conexiones activas
      acquire: 30000,        // Tiempo máximo en ms para intentar obtener una conexión
      idle: 10000            // Tiempo que una conexión puede estar inactiva antes de cerrarse
    }
  }
);

// Función para probar la conexión y sincronizar modelos
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL establecida correctamente.');
    
    // Sincronizar modelos con la base de datos (crear tablas si no existen)
    console.log('Sincronizando modelos con la base de datos...');
    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados correctamente.');
    
    return true;
  } catch (error) {
    console.error('Error al conectar a PostgreSQL:', error);
    return false;
  }
};

export default sequelize;