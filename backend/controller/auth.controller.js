import express from "express";
import {
  verifyJwt,
  listAllTokens,
  pwdChange,
  login,
  register,
  verifyEmail,
} from "../services/auth.service.js";
import { emailMegerosites } from "../services/emailsender.js";
import { jelszoVisszaallitas } from "../services/emailsender.js";


// A kódod további része
const router = express.Router();

router.get("/verify", (req, res) => {
  const access_token = req.cookies.access_token
    ? req.cookies.access_token
    : req.headers.authorization.split(" ")[1];
  const refresh_token = req.cookies.refresh_token
    ? req.cookies.refresh_token
    : req.headers.refreshtoken;

  if (!access_token || !refresh_token)
    res
      .status(401)
      .json({ message: "Access és/vagy Refresh token nem található" });
  else {
    verifyJwt(access_token, refresh_token)
      .then((data) => {
        if (data === "OK") {
          res.status(200).json({ message: "OK" });
        } else {
          res.cookie("access_token", data, {
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "none",
            secure: true,
            httpOnly: false,
            domain: "pollak.info",
            path: "/",
          });
          res.status(200).json({ message: "Refreshed", access_token: data });
        }
      })
      .catch((err) => {
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        res.status(403).json({ message: err });
      });
  }
});

router.post("/register", async (req, res) => {
  const { username, password, email, full_name } = req.body;
  try {
    const user = await register(username, password, email, full_name);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  console.log("Beérkezett kérés:", req.body); // Hibakeresés

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Hiányzó felhasználónév vagy jelszó" });
  }

  try {
    const result = await login(username, password);

    if (result.message) {
      return res.status(400).json({ message: result.message });
    }

    // Sikeres bejelentkezés
    res.status(200).json({
      access_token: result.access_token,
      refresh_token: result.refresh_token,
      user_id: result.user_id,
    });
  } catch (error) {
    console.error("Hiba a bejelentkezés során:", error);
    res.status(500).json({ message: "Hiba történt a bejelentkezés során" });
  }
});

router.put("/update", async (req, res) => {
  const {
    JWTAlgorithm,
    JWTExpiration,
    JWTSecret,
    RefreshTokenAlgorithm,
    RefreshTokenExpiration,
    RefreshTokenSecret,
  } = req.body;

  const asd = await updateMainData(
    JWTAlgorithm,
    JWTExpiration,
    JWTSecret,
    RefreshTokenAlgorithm,
    RefreshTokenExpiration,
    RefreshTokenSecret
  );

  res.status(200).json({
    message: asd,
  });
});

router.get("/token", async (req, res) => {
  try {
    const data = await listAllTokens();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching token data:", err);
    res.status(500).send("Error loading token settings");
  }
});

router.get("/genToken", async (req, res) => {
  try {
    res.status(200).json(data);
  } catch (err) {
    console.error("Error generating token: ", err);
    res.status(500).send("Error generating token");
  }
});

router.get("/validate", async (req, res) => {
  try {

    const token = req.headers["authorization"];
    if (!token) {
      return res.status(400).send("Token is required");
    }

    const isValid = await validateToken(token);
    if (isValid) {
      res.status(200).json({ message: "Token is valid" });
    } else {
      res.status(401).send("Invalid token");
    }
  } catch (err) {
    console.error("Error validating token: ", err);
    res.status(500).send("Error validating token");
  }
});

router.put("/pwdChange", async (req, res) => {
  try {
    const { pwd1, pwd2, id } = req.body;
    const data = await pwdChange(pwd1, pwd2, id);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error changing password: ", err);
    res.status(500).send("Error changing password");
  }
});

router.post("/emailMegerosites", async (req, res) => {
  const { email } = req.body;
  try {
    const data = await emailMegerosites(email);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send("Error sending email");
  }
});

router.post("/jelszoVisszaallitas", async (req, res) => {
  const { email } = req.body;
  try {
    const data = await jelszoVisszaallitas(email);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send("Error sending email");
  }
});

router.post("/logout", (req, res) => {
  try {
    res.clearCookie("access_token", { path: "/" });
    res.clearCookie("refresh_token", { path: "/" });
    res.clearCookie("sid", { path: "/" });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Error during logout:", err);
    res.status(500).json({ message: "Error during logout" });
  }
});

router.get("/verify-email", async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Hiányzó token." });
  }

  try {
    const result = await verifyEmail(token);
    res.status(200).json({ message: result });
  } catch (error) {
    console.error("Error during email verification:", error);
    res.status(400).json({ message: error.message });
  }
});






export { router as authController };
