import { Sequelize } from "sequelize";

const sequelize = new Sequelize("verceldb", "default", "UHgna91hRrXe", {
  host: "ep-patient-resonance-a1g5niva-pooler.ap-southeast-1.aws.neon.tech",
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // You might want to set this to `true` in production
    },
  },
});

export default sequelize;
