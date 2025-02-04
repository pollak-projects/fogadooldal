/* import express from "express";


const app = express()
const port = 3300


app.use(express.json());


app.listen(port, () => {
    console.log(`App started at http://localhost:${port}`)
}); */


import express from 'express';
import cookieParser from 'cookie-parser';
import { router as userRouter }  from './controller/user.controller.js';
import { listAllUsers } from './services/user.service.js'
import cors from "cors";
import { groupController } from './controller/group.controller.js';
import { listAllGroup } from './services/group.service.js';

const app = express()
const port = 3300

const corsOptions = {
    origin: [
      "http://localhost:5173"
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  };
  

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions));
app.set("view engine", "ejs")
app.use("/user", userRouter)
app.use("/group", groupController);

app.get("/", async (req, res) => {
    const userData = await listAllUsers();

    res.render("index", {
        users: userData
    })
})

app.get("/login", async (req, res) => {
    res.render("login")
})

app.get("/table", async (req, res) => {
    const userData = await GetAllUsers();
    const groupsData = await Groups();
    res.render("table", {
      users: userData,
      groups: groupsData,
    });
  });

  app.get("/groups", async (req, res) => {
    const groups = await listAllGroup();
    res.render("groups", {
      groups: groups,
    });
  });

app.listen(port, () => {
    console.log(`App started at http://localhost:${port}`)
})