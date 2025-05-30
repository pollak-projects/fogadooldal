import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { encrypt } from "../lib/hash.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { emailMegerosites } from "./emailsender.js";
import { addCoin } from "./coins.service.js";

const prisma = new PrismaClient();

export async function verifyJwt(access_token, refresh_token) {
  const data = await prisma.maindata.findFirst();

  return new Promise((resolve, reject) => {
    jwt.verify(
      access_token,
      data.JWTSecret,
      {
        algorithm: data.JWTAlgorithm,
      },
      async (err, decoded) => {
        console.error(err);

        if (decoded) resolve("OK");

        if (err && err.message === "jwt expired") {
          const ref = await verifyRefreshToken(refresh_token);
          const tokenWithIgnore = await verifyWithIgnoreExpiration(
            access_token
          );

          console.log(tokenWithIgnore);
          console.log(ref);

          if (ref.sub === tokenWithIgnore.sub) {
            resolve(
              createNewToken(
                tokenWithIgnore.sub,
                tokenWithIgnore.nev,
                tokenWithIgnore.email,
                tokenWithIgnore.userGroup
              )
            );
          } else {
            reject("Error Refreshing the token");
          }
        } else if (err) reject("Error Refreshing the token", err);
      }
    );
  });
}

async function verifyRefreshToken(refresh_token) {
  const data = await prisma.maindata.findFirst();
  let ret;
  try {
    ret = jwt.verify(refresh_token, data.RefreshTokenSecret, {
      algorithm: data.RefreshTokenAlgorithm,
    });
  } catch (err) {
    ret = null;
  }

  return ret;
}

async function verifyWithIgnoreExpiration(token) {
  const data = await prisma.maindata.findFirst();
  let ret;
  try {
    ret = jwt.verify(token, data.JWTSecret, {
      algorithm: data.JWTAlgorithm,
      ignoreExpiration: true,
    });
  } catch (err) {
    ret = null;
  }

  return ret;
}

async function createNewToken(id, nev, email, groupsNeve) {
  const data = await prisma.maindata.findFirst();

  console.log("Creating token with: ", id, nev, email, groupsNeve);

  return jwt.sign(
    {
      sub: id,
      name: nev,
      email: email,
      userGroup: groupsNeve,
    },
    data.JWTSecret,
    {
      expiresIn: data.JWTExpiration,
      algorithm: data.JWTAlgorithm,
    }
  );
}

export async function verifyEmail(token) {
  console.log("Token received:", token); // Hibakereséshez
  const user = await prisma.user.findFirst({
    where: {
      email_verification_token: token,
    },
  });

  if (!user) {
    console.log("User not found with token:", token); // Hibakereséshez
    throw new Error("Érvénytelen token.");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      email_verified: true,
      email_verification_token: null,
    },
  });

  console.log("Email verified for user:", user.id); // Hibakereséshez
  return "Sikeres megerősítés! Most már bejelentkezhetsz.";
}

export async function register(username, password, email, full_name) {
  const pwdEncrypted = await encrypt(password);

  let uuid = crypto.randomUUID();

  const user = await prisma.user.create({
    data: {
      username: username,
      password: pwdEncrypted,
      email: email,
      full_name: full_name,
      email_verification_token: uuid,
    },
  });
  await addCoin(1000, user.id).catch((err) => {
    console.error(err);
    throw new Error();
  });
  await emailMegerosites(email, uuid);
}

export async function login(username, password) {
  console.log("Bejelentkezési kérés:", username); // Hibakeresés

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    console.log("Felhasználó nem található:", username); // Hibakeresés
    return { message: "Hibás felhasználónév vagy jelszó" };
  }

  if (!(await bcrypt.compare(password, user.password))) {
    console.log("Hibás jelszó:", username); // Hibakeresés
    return { message: "Hibás felhasználónév vagy jelszó" };
  }

  if (user.email_verified === false) {
    console.log("Email nincs megerősítve:", username); // Hibakeresés
    return { message: "Kérlek erősítsd meg az email címedet a bejelentkezés előtt." };
  }

  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(
    {
      sub: user.id,
      username: user.username,
      name: user.nev,
      email: user.email,
      userGroup: user.groupsNeve,
    },
    secret,
    {
      expiresIn: 20 * 60 * 1000,
      algorithm: "HS512",
    }
  );

  const refreshToken = jwt.sign(
    {
      sub: user.id,
    },
    secret,
    {
      expiresIn: 20 * 60 * 1000,
      algorithm: "HS512",
    }
  );

  console.log("Sikeres bejelentkezés:", user.id); // Hibakeresés
  return {
    access_token: token,
    refresh_token: refreshToken,
    user_id: user.id,
  };
}




export async function listAllTokens() {
  const data = await prisma.maindata.findUnique({
    where: {
      id: "5a97ea0a-a19f-11ef-95f3-0a0027000007",
    },
  });

  return data;
}

export async function createForgotToken(userId) {
  const token = crypto.randomBytes(50).toString("hex");
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1);

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        ForgotToken: token,
        ForgotTokenExpiresAt: expiresAt,
      },
    });
    return token;
  } catch (err) {
    return err;
  }
}

export async function pwdChange(pwd1, pwd2, id) {
  if (pwd1 == pwd2) {
    const data = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: await encrypt(pwd1),
      },
    });
  } else {
    return false;
  }
}
