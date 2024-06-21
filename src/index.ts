import express from "express";
import sequelize from "./config/database";
import identifyRoute from "./routes/identify";
import setupSwagger from "./swagger";

const app = express();

app.use(express.json());
app.use("/api", identifyRoute);

const PORT = process.env.DB_PORT || 3002;

sequelize.sync().then(async () => {
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    setupSwagger(app); // Setup Swagger after starting the server
  });
});
