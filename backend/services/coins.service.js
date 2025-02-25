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

export async function removeCoin(mennyiseg, userid) {
  await prisma.coin
    .update({
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
