"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("verceldb", "default", "UHgna91hRrXe", {
    host: "ep-patient-resonance-a1g5niva-pooler.ap-southeast-1.aws.neon.tech",
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // You might want to set this to `true` in production
        },
    },
});
exports.default = sequelize;
