import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listAllGroup() {
  const data = await prisma.groups.findMany({
    include: {
      users: true,
    },
  });

  return data;
}

export async function addGroup(name, write, read, update, del) {
  console.log(write, read, update, del);
  await prisma.groups
    .create({
      data: {
        name: name,
        write: write,
        read: read,
        update: update,
        del: del,
      },
    })
    .catch((err) => {
      console.error(err);
      throw new Error();
    });
}

export async function deleteGroup(name) {
  await prisma.groups.delete({
    where: {
      name: name,
    },
  });
}

export async function updateGroup(
  name,
  newname,
  writeUjJog,
  readUjJog,
  updateUjJog,
  delUjJog
) {
  await prisma.groups.update({
    where: {
      name: name,
    },
    data: {
      name: newname,
      write: writeUjJog,
      read: readUjJog,
      update: updateUjJog,
      del: delUjJog,
    },
  });
}
