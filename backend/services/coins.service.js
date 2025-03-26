import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listAllCoinsById(id) {
  const data = await prisma.coin.findUnique({
    where: {
      id: Number(id),
    },
  });
  return data;
}

export async function addCoin(mennyiseg, userid) {
  await prisma.coin
    .create({
      data: {
        mennyiseg: mennyiseg,
        userid: userid,
      },
    })
    .catch((err) => {
      console.error(err);
      throw new Error();
    });
}

export async function updateCoin(userid, mennyiseg) {
  await prisma.coin
    .update({
      where: {
        userid: userid,
      },
      data: {
        mennyiseg: mennyiseg,
      },
    })
    .catch((err) => {
      console.error(err.message);
      throw new Error(err.message);
    });
}
