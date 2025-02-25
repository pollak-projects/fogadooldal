import express from "express";
import {
  addCoin,
  removeCoin,
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

router.put("/remove", async (req, res) => {
  const { mennyiseg, userid } = req.body;

  await removeCoin(mennyiseg, userid);

  res.status(200).json({
    message: "Data successfully updated",
  });
});

export { router as coinController };
