import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);
app.use("/login", loginRoutes);

app.get("/", async (req, res) => {
  res.send("Hello from DALL-E");
});

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`Server Listening on ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};

startServer();
