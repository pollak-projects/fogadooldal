import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function listAllUsers() {
  return await prisma.user.findMany();
}

export async function imageGetFromDB(kapottTipus) {
  const data = await prisma.user.findMany({
    where: {
      tipus: kapottTipus,
    },
  });
  data.forEach((element) => {
    //console.log(element.image);
    let buffer = Buffer.from(element.image);
    element.image = "data:image/png" + ";base64," + buffer.toString("base64");
  });

  return data;
}

export async function imageSaveToDB(image) {
  const imageBlob = Buffer.from(image, "base64");

  try {
    const result = await prisma.user.update({
      where:{
        userId: userId
      },
      data: {
        image: imageBlob,
        text: "PLACEHOLDER",
      },
    });
    return result;
  } catch (error) {
    console.error("Error in imageDBSave: ", error);
  }
}

export async function imageGetFromDB(kapottTipus) {
  const data = await prisma.feladatokPairPictures.findMany({
    where: {
      tipus: kapottTipus,
    },
  });
  data.forEach((element) => {
    //console.log(element.image);
    let buffer = Buffer.from(element.image);
    element.image = "data:image/png" + ";base64," + buffer.toString("base64");
  });

  return data;
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
  const hashedPwd = await encrypt(password);
  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      username: username,
      password: hashedPwd,
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
