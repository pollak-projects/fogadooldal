import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function listAllUsers() {
  return await prisma.user.findMany();
}

export async function listAllDataById(id) {
  if (typeof id !== "number" || isNaN(id)) {
    throw new Error("Az ID-nak számnak kell lennie.");
  }

  return await prisma.user.findUnique({
    include: { coin: true },
    where: { id: id },
  });
}

export async function deleteMessage(messageId) {
  return await prisma.chatMessage.delete({
    where: { id: messageId },
  });
}

export async function banUser(userId) {
  return await prisma.user.update({
    where: { id: userId },
    data: { isBanned: true },
  });
}

export async function timeoutUser(userId, minutes) {
  const timeoutExpires = new Date();
  timeoutExpires.setMinutes(timeoutExpires.getMinutes() + minutes);

  return await prisma.user.update({
    where: { id: userId },
    data: { timeoutExpires },
  });
}
export async function addUser(username, password, email, full_name) {
  const hashedPwd = await encrypt(password);
  const user = await prisma.user
    .create({
      data: {
        username: username,
        password: hashedPwd,
        full_name: full_name,
        email: email,
        created_at: new Date(),
        updated_at: new Date(),
      },
    })
    .catch((err) => {
      console.error(err);
      throw new Error();
    });
  return user;
}

export async function updateUser(id, username, password, email, groupsNeve) {
  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      username: username,
      password: password,
      email: email,
      groupsNeve: groupsNeve,
    },
  });
}

export async function deleteUser(id) {
  await prisma.coin.delete({
    where: {
      userid: id,
    },
  });
  await prisma.user.delete({
    where: {
      id: id,
    },
  });
}

export function encrypt(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, Salt) => {
      bcrypt.hash(password, Salt, (err, hash) => {
        resolve(hash);
      });
    });
  });
}
