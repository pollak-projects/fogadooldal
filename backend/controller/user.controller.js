import express from 'express';
import { listAllUsers, addUser, deleteUser, updateUser, login } from '../services/user.service.js';

const router = express.Router();

router.get("/getAll", async (req, res) => {
    const data = await listAllUsers();
    res.status(200).json(data);
})

router.post("/register", async (req, res) => {
    const { username, email, password, nev, om, groupsNeve } = req.body;
    try {
      const user = await register(username, email, password, nev, om, groupsNeve);
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  });

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await login(username, password);
  
      if (!user.access_token || !user.refresh_token) {
        res.status(401).json({ message: "Hibás felhasználó név vagy jelszó!" });
        return;
      }
      res.cookie("access_token", user.access_token, {
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
        httpOnly: false,
        domain: "localhost:5173",
        path: "/",
      });
      res.cookie("refresh_token", user.refresh_token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: false,
        sameSite: "none",
        secure: true,
        domain: "localhost:5173",
        path: "/",
      });
  
      req.session.user_id = user.user_id;
  
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  


  router.post("/logout", (req, res) => {
    res.clearCookie("access_token", {
      domain: "pollak.info",
      path: "/",
    });
    res.clearCookie("refresh_token", {
      domain: "pollak.info",
      path: "/",
    });
    res.clearCookie("sid", {
      domain: "pollak.info",
      path: "/",
    });
    res.status(200).json({ message: "Logged out successfully" });
  });

router.post("/add", async (req, res) => {
    const { username, password, email, admin, full_name } = req.body;

    await addUser(username, password, email, admin, full_name   ).then(() => {
        res.status(201).json({
            message: "Data successfully inserted"
        })
    }).catch(() => {
        res.status(409).json({
            message: "Duplicated data"
        })
    })
})

router.delete("/delete", async (req, res) => {
    const id = Number(req.query.id);

    await deleteUser(id);

    res.status(204).json({
        message: "Data successfully deleted"
    })
})

router.put("/update", async (req, res) =>{
    const id = Number(req.query.id);
    const { password, email } = req.body;

    await updateUser(id, password, email);

    res.status(200).json({
        message: "Data successfully updated"
    })
})

export { router };