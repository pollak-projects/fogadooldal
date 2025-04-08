import express from "express";
import {
  listAllUsers,
  addUser,
  deleteUser,
  updateUser,
  listAllDataById,
  imageGetFromDB,
  imageSaveToDB
} from "../services/user.service.js";
import { PrismaClient } from "@prisma/client";
import { encrypt } from "../lib/hash.js";




const prisma = new PrismaClient();
const router = express.Router();

// ID alapján lekérdezés
router.get("/getAllById/:id", async (req, res) => {
  try {
    const id = Number(req.params.id); // Konvertálás számra
    if (isNaN(id)) {
      return res.status(400).json({ message: "Érvénytelen ID formátum." });
    }

    const data = await listAllDataById(id); // Adatok lekérése
    if (!data) {
      return res.status(404).json({ message: "Felhasználó nem található." });
    }

    res.status(200).json(data); // Sikeres válasz
  } catch (error) {
    console.error("Hiba a felhasználó lekérésekor:", error);
    res.status(500).json({ message: "Szerverhiba." });
  }
});

// Összes felhasználó lekérése
router.get("/getAll", async (req, res) => {
  try {
    const data = await listAllUsers(); // Összes felhasználó lekérése
    res.status(200).json(data); // Sikeres válasz
  } catch (error) {
    console.error("Hiba a felhasználók lekérésekor:", error);
    res.status(500).json({ message: "Szerverhiba." });
  }
});

router.get("/getImages", async (req, res) => {
  const { id } = req.query;
  const data = await imageGetFromDB(id);
  res.status(200).json(data);
});

router.put("/setPfp", async (req, res) => {
  const { file, id } = req.body;
  console.log(file);
  const data = await imageSaveToDB(file, id);
  res.status(200).json(data);
});

// Új felhasználó hozzáadása
router.post("/add", async (req, res) => {
  const { username, password, email, full_name } = req.body;

  try {
    const response = await addUser(username, password, email, full_name);
    res.status(201).json({
      message: "Sikeresen hozzáadva.",
      id: response.id,
    });
  } catch (error) {
    console.error("Hiba a felhasználó hozzáadásakor:", error);
    res.status(409).json({ message: "Duplikált adat." });
  }
});

// Felhasználó törlése
router.delete("/delete", async (req, res) => {
  try {
    const id = Number(req.query.id); // Konvertálás számra
    if (isNaN(id)) {
      return res.status(400).json({ message: "Érvénytelen ID formátum." });
    }

    await deleteUser(id); // Felhasználó törlése
    res.status(204).json({ message: "Sikeresen törölve." });
  } catch (error) {
    console.error("Hiba a felhasználó törlésekor:", error);
    res.status(500).json({ message: "Szerverhiba." });
  }
});

// Felhasználó frissítése
router.put("/update", async (req, res) => {
  try {
    const id = Number(req.query.id); // Konvertálás számra
    if (isNaN(id)) {
      return res.status(400).json({ message: "Érvénytelen ID formátum." });
    }

    const { username, password, email, groupsNeve } = req.body;
    await updateUser(id, username, password, email, groupsNeve); // Felhasználó frissítése
    res.status(200).json({ message: "Sikeresen frissítve." });
  } catch (error) {
    console.error("Hiba a felhasználó frissítésekor:", error);
    res.status(500).json({ message: "Szerverhiba." });
  }
});


router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const hashedPwd = await encrypt(password);

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        password: hashedPwd
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Hiba a felhasználó frissítésekor:", error);
    res.status(500).json({ message: "Hiba történt a felhasználó frissítésekor" });
  }
});

export { router };