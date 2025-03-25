import express from 'express';
import { PrismaClient } from '@prisma/client';
import {
    listAllCoinflipRecords,
    addCoinflipRecord,
    deleteCoinflipRecord,
    updateCoinflipRecord,
  } from "../services/coinflip.service.js";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/getAll", async (req, res) => {
    try {
      const data = await listAllCoinflipRecords(); 
      res.status(200).json(data); 
    } catch (error) {
      console.error("Hiba a rekordok lekérésekor:", error);
        res.status(500).json({ message: "Szerverhiba." });
    }
});

router.post("/add", async (req, res) => {
    const { fej, iras } = req.body;
  
    try {
      const response = await addCoinflipRecord(fej, iras);
      res.status(201).json({
        message: "Sikeresen hozzáadva.",
        id: response.id,
      });
    } catch (error) {
      console.error("Hiba a rekord hozzáadásakor:", error);
      res.status(409).json({ message: "Duplikált adat." });
    }
});

router.delete("/delete", async (req, res) => {
    try {
      const id = Number(req.query.id); // Konvertálás számra
      if (isNaN(id)) {
        return res.status(400).json({ message: "Érvénytelen ID formátum." });
      }
  
      await deleteCoinflipRecord(id);
      res.status(204).json({ message: "Sikeresen törölve." });
    } catch (error) {
      console.error("Hiba a rekord törlésekor:", error);
      res.status(500).json({ message: "Szerverhiba." });
    }
});

  router.put("/update", async (req, res) => {
    try {
      const id = Number(req.query.id); // Konvertálás számra
      if (isNaN(id)) {
        return res.status(400).json({ message: "Érvénytelen ID formátum." });
      }
  
      const { fej, iras } = req.body;
      await updateCoinflipRecord(id, fej, iras); 
      res.status(200).json({ message: "Sikeresen frissítve." });
    } catch (error) {
      console.error("Hiba a rekord frissítésekor:", error);
      res.status(500).json({ message: "Szerverhiba." });
    }
});

export { router as coinflipController };