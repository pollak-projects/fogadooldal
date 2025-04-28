import express from "express";
import {
  listAllGroup,
  addGroup,
  deleteGroup,
  updateGroup,
} from "../services/group.service.js";

const router = express.Router();

router.get("/getAll", async (req, res) => {
  try {
    const data = await listAllGroup(); // Összes felhasználó lekérése
    res.status(200).json(data); // Sikeres válasz
  } catch (error) {
    console.error("Hiba a felhasználók lekérésekor:", error);
    res.status(500).json({ message: "Szerverhiba." });
  }
});

router.post("/add", async (req, res) => {
  const { name, write, read, update, del } = req.body;

  try {
    await addGroup(name, write, read, update, del);

    res.status(201).json({
      message: "Data successfully inserted",
    });
  } catch (error) {
    res.status(409).json({
      message: "Duplicated data",
    });
  }
});

router.delete("/delete", async (req, res) => {
  const { name } = req.body;

  await deleteGroup(name);

  res.status(204).json({
    message: "Data successfully deleted",
  });
});

router.put("/update", async (req, res) => {
  const { name, newname, write, read, update, del } = req.body;

  await updateGroup(name, newname, write, read, update, del);

  res.status(200).json({
    message: "Data successfully updated",
  });
});

export { router as groupController };
