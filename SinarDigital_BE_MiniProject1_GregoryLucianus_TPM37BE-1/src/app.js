import express from "express";
import path from "path";
import router from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DEBUG MIDDLEWARE - Temporary
app.use((req, res, next) => {
  console.log("=== DEBUG ===");
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Content-Type:", req.headers["content-type"]);
  console.log("Body:", req.body);
  console.log("Body is undefined?", req.body === undefined);
  console.log("=============");
  next();
});

app.use(express.static(path.resolve("public")));

// Routes
app.use("/", router);

// Error handling
app.use(errorHandler);

export default app;
