import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listAllCoinflipRecords() {
    return await prisma.coinflip.findMany();
}

export async function addCoinflipRecord(fej, iras) {
    const record = await prisma.coinflip
      .create({
        data: {
          fej: fej,
          iras: iras,
          date: new Date()
        },
      })
      .catch((err) => {
        console.error(err);
        throw new Error();
      });
    return record;
}

export async function updateCoinflipRecord(fej, iras) {
    await prisma.coinflip.update({
      where: {
        id: id,
      },
      data: {
        fej: fej,
        iras: iras
      },
    });
}

  export async function deleteCoinflipRecord(id) {
    await prisma.coinflip.delete({
      where: {
        id: id,
      },
    });
}
  