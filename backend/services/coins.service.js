import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listAllCoins() {
  const data = await prisma.coin.findMany();
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

export async function updateCoin(id, mennyiseg, userid) {
  await prisma.coin
    .update({
      where: {
        id: id,
      },
      data: {
        mennyiseg: mennyiseg,
        userid: userid,
      },
    })
    .catch((err) => {
      console.error(err.message);
      throw new Error(err.message);
    });
}
