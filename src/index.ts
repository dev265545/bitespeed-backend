import express from "express";
import sequelize from "./config/database";
import insertContact from "./services/contactService";
import identifyRoute from "./routes/identify";

const app = express();

app.use(express.json());
app.use("/api", identifyRoute);

const PORT = process.env.PORT || 3002;

sequelize.sync().then(async () => {
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    // Example data to insert
    const exampleData1 = {
      email: "lorraine@hillvalley.edu",
      phoneNumber: "123456",
    };

    const exampleData2 = {
      email: "mcfly@hillvalley.edu",
      phoneNumber: "123456",
    };
  });
});
