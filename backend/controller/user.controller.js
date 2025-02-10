import express from 'express';
import { listAllUsers, addUser, deleteUser, updateUser, login } from '../services/user.service.js';

const router = express.Router();

router.get("/getAll", async (req, res) => {
    const data = await listAllUsers();
    res.status(200).json(data);
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)
    const data = await login(username, password);
    
        res.status(200).json({ message: data })
    {
        res.status(401).json({ message: "Bad Request" })
    }
})


router.delete("/logout", async (req, res) => {
    const user_id = Number(req.query.id);

    await logout(user_id);

    res.clearCookie("apiKey")
    res.status(200).json({ message: "Successfully logged out" })
})

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