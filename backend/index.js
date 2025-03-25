import express from "express";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import { router as userRouter } from "./controller/user.controller.js";
// import { listAllUsers } from "./services/user.service.js";
import { 
  listAllUsers, 
  deleteMessage, 
  banUser, 
  timeoutUser 
} from "./services/user.service.js";

import cors from "cors";
import { groupController } from "./controller/group.controller.js";
import { listAllTokens } from "./services/auth.service.js";
import { listAllGroup } from "./services/group.service.js";
import { authController } from "./controller/auth.controller.js";
import { coinController } from "./controller/coins.controller.js";
import { isAdmin } from "./utils/auth.js";
import { listAllDataById } from "./services/user.service.js";
import { coinflipController } from "./controller/coinflip.controller.js";
import { rouletteController } from "./controller/roulette.controller.js";

const app = express();
const port = 3300;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.set("view engine", "ejs");

app.use("/user", userRouter);
app.use("/auth", authController);
app.use("/group", groupController);
app.use("/coins", coinController);
app.use("/coinflip", coinflipController);
app.use("/roulette", rouletteController);

io.on("connection", (socket) => {
  console.log("Egy felhasználó csatlakozott:", socket.id);


socket.on("login", (userId) => {
  socket.userId = Number(userId); 
  console.log("Felhasználó bejelentkezett, userId:", socket.userId);
});

  
socket.on("chat message", async (msg) => {
  if (!socket.userId || typeof socket.userId !== "number") {
    return console.error("Érvénytelen userId:", socket.userId);
  }

  try {
    const user = await listAllDataById(socket.userId);
    if (user.isBanned) return;
    if (user.timeoutExpires >= new Date() ) return;
    io.emit("chat message", {
      text: msg,
      user: user.username,
      userId: user.id,
      isAdmin: isAdmin(user),
      messageId: Date.now(),
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
});

   socket.on("delete message", async (messageId) => {
    if (!socket.userId || typeof socket.userId !== 'number') {
      console.error("Invalid userId:", socket.userId);
      return;
    }

    try {
      const user = await listAllDataById(socket.userId);
      console.log(user)
      if (isAdmin(user)) {
        console.log("admin")
        // await deleteMessage(messageId);
        io.emit("message deleted", messageId);
      }
    } catch (error) {
      console.error("Hiba üzenet törlésekor:", error);
    }
  });

  
  socket.on("ban user", async (userId) => {
    if (!socket.userId || typeof socket.userId !== 'number') {
      console.error("Invalid userId:", socket.userId);
      return;
    }

    try {
      const user = await listAllDataById(socket.userId);
      if (isAdmin(user)) {
        await banUser(userId);
        
        io.emit("user banned", userId);
      }
    } catch (error) {
      console.error("Hiba felhasználó kitiltásakor:", error);
    }
  });

  
  socket.on("timeout user", async (userId, minutes) => {
    if (!socket.userId || typeof socket.userId !== 'number') {
      console.error("Invalid userId:", socket.userId);
      return;
    }

    try {
      const user = await listAllDataById(socket.userId);
      if (isAdmin(user)) {
        await timeoutUser(userId, minutes);
        io.emit("user timeout", { userId, minutes });
      }
    } catch (error) {
      console.error("Hiba timeout alkalmazásakor:", error);
    }
  });

  // Kapcsolat bontása
  socket.on("disconnect", () => {
    console.log("Egy felhasználó kilépett:", socket.id);
  });
});


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



// index.js (Express middleware)
app.param("id", (req, res, next, id) => {
  const userId = Number(id);
  if (isNaN(userId)) {
    return res.status(400).send("Érvénytelen ID formátum.");
  }
  req.userId = userId; // Továbbítjuk a kontrollernek
  next();
});


export default app;