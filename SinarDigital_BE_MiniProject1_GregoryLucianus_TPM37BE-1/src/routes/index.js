import { Router } from "express";
import apiRoutes from "./apiRoutes.js";
import { appName } from "../config/app.config.js";

const router = Router();

//jujur bagian ini di-chatgpt dan masih kurang ngerti gunanya but yes-
router.get("/", (req, res) => {
  res.send(`Welcome to ${appName} API. Open /index.html to use the form.`);
});

router.use("/api", apiRoutes);

export default router;
