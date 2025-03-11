const express = require("express");
const router = express.Router();
const { isAdmin } = require("../utils/auth");

router.delete("/:messageId", async (req, res) => {
  if (!isAdmin(req.user)) return res.status(403).send("Hozzáférés megtagadva");
  await deleteMessage(req.params.messageId); // Példa függvény
  io.emit("messageDeleted", req.params.messageId); // Valós idejű frissítés
  res.send("Üzenet törölve");
});

module.exports = router;