import express from "express";
import http from "http"; // Importáld a http modult
import { Server } from "socket.io"; // Importáld a Socket.IO-t
import cookieParser from "cookie-parser";
import { router as userRouter } from "./controller/user.controller.js";
import { listAllUsers } from "./services/user.service.js";
import cors from "cors";
import { groupController } from "./controller/group.controller.js";
import { listAllTokens } from "./services/auth.service.js";
import { listAllGroup } from "./services/group.service.js";
import { authController } from "./controller/auth.controller.js";
import { coinController } from "./controller/coins.controller.js";

const app = express();
const port = 3300;

// HTTP szerver létrehozása
const server = http.createServer(app);

// Socket.IO szerver létrehozása
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // A frontend címe
    methods: ["GET", "POST"],
  },
});

// CORS beállítások
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware-ek
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.set("view engine", "ejs");

// Router-ek
app.use("/user", userRouter);
app.use("/auth", authController);
app.use("/group", groupController);
app.use("/coins", coinController);

// Socket.IO eseménykezelők
io.on("connection", (socket) => {
  console.log("Egy felhasználó csatlakozott:", socket.id);

  socket.on("chat message", (msg) => {
    console.log("Üzenet:", msg);
    io.emit("chat message", msg); // Mindenki számára küldjük az üzenetet
  });

  socket.on("disconnect", () => {
    console.log("Egy felhasználó kilépett:", socket.id);
  });
});

// Útvonalak
app.get("/", async (req, res) => {
  const userData = await listAllUsers();
  res.render("index", {
    users: userData,
  });
});

app.get("/verify-email", async (req, res) => {
  const { token } = req.query;
  try {
    const result = await verifyEmail(token);
    res.send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/login", async (req, res) => {
  res.render("login");
});

app.get("/forgotpassword", (req, res) => {
  res.render("forgotpassword");
});

app.get("/changepassword", (req, res) => {
  res.render("changepassword");
});

app.get("/register", async (req, res) => {
  res.render("register");
});

app.get("/token", async (req, res) => {
  res.render("token", {
    tokenData: await listAllTokens(),
  });
});

app.get("/users", async (req, res) => {
  const userData = await listAllUsers();
  const groupsData = await listAllGroup();
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

// Szerver indítása
server.listen(port, () => {
  console.log(`App started at http://localhost:${port}`);
});

export default app;