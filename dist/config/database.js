"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Destructure environment variables with defaults to prevent undefined values
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env;
// Throw an error if any required environment variable is missing
if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_DIALECT) {
    throw new Error("Missing one or more required environment variables: DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT");
}
const sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT, // Sequelize.Dialect is a string type so this is safe
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // You might want to set this to `true` in production
        },
    },
});
exports.default = sequelize;
