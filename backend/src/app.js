import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/index.js";
import "./config/index.js";
import walletRoutes from "./routes/walletRoutes.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/api", routes);
app.use("/api/wallet", walletRoutes);

export default app;
