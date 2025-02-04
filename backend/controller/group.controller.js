import express from 'express';
import { listAllGroup, addGroup, deleteGroup, updateGroup } from '../services/group.service.js';

const router = express.Router();

router.get("/getAll", async (req, res) => {
    const data = await listAllGroup();
    res.status(200).json(data);
})

router.post("/add", async (req, res) => {
    const { name, write, read, update, del } = req.body;

    try {
        await addGroup(name, write, read, update, del);
        
        res.status(201).json({
            message: "Data successfully inserted"
        });
    } catch (error) {
        res.status(409).json({
            message: "Duplicated data"
        });
    }
});


router.delete("/delete", async (req, res) => {
    const { name } = req.body;

    await deleteGroup(name);

    res.status(204).json({
        message: "Data successfully deleted"
    })
})

router.put("/update", async (req, res) =>{
    const { name, newname } = req.body;

    await updateGroup(name, newname);

    res.status(200).json({
        message: "Data successfully updated"
    })
})

export { router as groupController };