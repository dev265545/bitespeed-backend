import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Destructure environment variables with defaults to prevent undefined values
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env;

// Throw an error if any required environment variable is missing
if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_DIALECT) {
  throw new Error(
    "Missing one or more required environment variables: DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT"
  );
}

const sequelize = new Sequelize(
  DB_NAME as string,
  DB_USER as string,
  DB_PASSWORD as string,
  {
    host: DB_HOST as string,
    dialect: DB_DIALECT as any, // Sequelize.Dialect is a string type so this is safe
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // You might want to set this to `true` in production
      },
    },
  }
);

export default sequelize;
