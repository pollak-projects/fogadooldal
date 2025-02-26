import express from "express";
import {
  addCoin,
  updateCoin,
  listAllCoins,
} from "../services/coins.service.js";
const router = express.Router();

router.get("/getAll", async (req, res) => {
  const data = await listAllCoins();
  res.status(200).json(data);
});

router.post("/add", async (req, res) => {
  const { mennyiseg, userid } = req.body;

  try {
    await addCoin(mennyiseg, userid);

    res.status(201).json({
      message: "Data successfully inserted",
    });
  } catch (error) {
    console.log(error);
    res.status(409).json({
      message: "Duplicated data",
    });
  }
});

router.put("/update", async (req, res) => {
  const { id, mennyiseg, userid } = req.body;

  await updateCoin(id, mennyiseg, userid);

  res.status(200).json({
    message: "Data successfully updated",
  });
});

export { router as coinController };
