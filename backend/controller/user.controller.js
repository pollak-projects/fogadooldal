import express, { response } from "express";
import {
  listAllUsers,
  addUser,
  deleteUser,
  updateUser,
  login,
} from "../services/user.service.js";

const router = express.Router();

router.get("/getAll", async (req, res) => {
  const data = await listAllUsers();
  res.status(200).json(data);
});

router.post("/add", async (req, res) => {
  const { username, password, email, full_name } = req.body;
  await addUser(username, password, email, full_name)
    .then((response) => {
      res.status(201).json({
        message: "Data successfully inserted",
        id: response.id,
      });
    })
    .catch(() => {
      res.status(409).json({
        message: "Duplicated data",
      });
    });
});

router.delete("/delete", async (req, res) => {
  const id = Number(req.query.id);

  await deleteUser(id);

  res.status(204).json({
    message: "Data successfully deleted",
    id: response.id,
  });
});

router.put("/update", async (req, res) => {
  const id = Number(req.query.id);
  const { username, password, email, groupsNeve } = req.body;

  await updateUser(id, username, password, email, groupsNeve);

  res.status(200).json({
    message: "Data successfully updated",
  });
});

export { router };
