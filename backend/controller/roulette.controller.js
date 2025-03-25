import express from 'express';
import {
    listAllRouletteRecords,
    addRouletteRecord,
    deleteRouletteRecord,
    updateRouletteRecord,
  } from "../services/roulette.service.js";


const router = express.Router();

router.get("/getAll", async (req, res) => {
    try {
      const data = await listAllRouletteRecords(); 
      res.status(200).json(data); 
    } catch (error) {
      console.error("Hiba a rekordok lekérésekor:", error);
        res.status(500).json({ message: "Szerverhiba." });
    }
});

router.post("/add", async (req, res) => {
    const { piros, fekete, zold } = req.body;
  
    try {
      const response = await addRouletteRecord(piros, fekete, zold);
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
  
      await deleteRouletteRecord(id);
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
  
      const { piros, fekete, zold } = req.body;
      await updateRouletteRecord(id, piros, fekete, zold); 
      res.status(200).json({ message: "Sikeresen frissítve." });
    } catch (error) {
      console.error("Hiba a rekord frissítésekor:", error);
      res.status(500).json({ message: "Szerverhiba." });
    }
});


export { router as rouletteController };