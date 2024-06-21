import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

// Define the Contact model class which extends the Sequelize Model class
class Contact extends Model {
  // Public fields with their types
  public id!: number;
  public phoneNumber?: string;
  public email?: string;
  public linkedId?: number;
  public linkPrecedence!: "primary" | "secondary";
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt?: Date;
}

// Initialize the Contact model with its attributes and options
Contact.init(
  {
    // Define the id field as an auto-incremented primary key
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // Define the phoneNumber field as an optional string
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Define the email field as an optional string
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Define the linkedId field as an optional integer
    linkedId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // Define the linkPrecedence field as a required enum with values "primary" or "secondary"
    linkPrecedence: {
      type: DataTypes.ENUM("primary", "secondary"),
      allowNull: false,
    },
    // Define the createdAt field as a required date with a default value of the current time
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // Define the updatedAt field as a required date with a default value of the current time
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // Define the deletedAt field as an optional date
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    // Pass the sequelize instance
    sequelize,

    modelName: "Contact",

    tableName: "Contacts",

    timestamps: true,
    paranoid: true,
  }
);

export default Contact;
