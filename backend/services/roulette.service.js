import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listAllRouletteRecords() {
    return await prisma.roulette.findMany();
}

export async function addRouletteRecord(piros, fekete, zold) {
    const record = await prisma.roulette
      .create({
        data: {
          piros: piros,
          fekete: fekete,
          zold: zold,
          date: new Date()
        },
      })
      .catch((err) => {
        console.error(err);
        throw new Error();
      });
    return record;
}

export async function updateRouletteRecord(id, piros, fekete, zold) {
    await prisma.roulette.update({
      where: {
        id: id,
      },
      data: {
        piros: piros,
        fekete: fekete,
        zold: zold
      },
    });
}

  export async function deleteRouletteRecord(id) {
    await prisma.roulette.delete({
      where: {
        id: id,
      },
    });
}
  