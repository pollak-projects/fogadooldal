const express = require("express");
const router = express.Router();
const { isAdmin } = require("../utils/auth");

router.post("/:userId/ban", async (req, res) => {
  if (!isAdmin(req.user)) return res.status(403).send("Hozzáférés megtagadva");
  await banUser(req.params.userId); // Példa függvény
  io.emit("userBanned", req.params.userId); // Valós idejű frissítés
  res.send("Felhasználó kitiltva");
});

module.exports = router;