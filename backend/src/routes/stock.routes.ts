import { Router } from "express";
import { stockIn } from "../controllers/stock.controller";

const router = Router();

router.get("/test", (_req, res) => {
  res.json({
    message: "Stock route is working",
  });
});

router.post("/in", stockIn);

export default router;