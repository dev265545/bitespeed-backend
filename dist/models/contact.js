"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
// Define the Contact model class which extends the Sequelize Model class
class Contact extends sequelize_1.Model {
}
// Initialize the Contact model with its attributes and options
Contact.init({
    // Define the id field as an auto-incremented primary key
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // Define the phoneNumber field as an optional string
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    // Define the email field as an optional string
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    // Define the linkedId field as an optional integer
    linkedId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    // Define the linkPrecedence field as a required enum with values "primary" or "secondary"
    linkPrecedence: {
        type: sequelize_1.DataTypes.ENUM("primary", "secondary"),
        allowNull: false,
    },
    // Define the createdAt field as a required date with a default value of the current time
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    // Define the updatedAt field as a required date with a default value of the current time
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    // Define the deletedAt field as an optional date
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    // Pass the sequelize instance
    sequelize: database_1.default,
    modelName: "Contact",
    tableName: "Contacts",
    timestamps: true,
    paranoid: true,
});
exports.default = Contact;
