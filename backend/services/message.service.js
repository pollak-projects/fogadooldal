import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createMessage(text, userId) {
  return await prisma.chatMessage.create({
    data: {
      text,
      userId
    }
  });
}

export async function deleteMessage(messageId) {
  return await prisma.chatMessage.delete({
    where: { id: messageId }
  });
}