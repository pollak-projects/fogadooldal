/*
  Warnings:

  - You are about to drop the column `admin` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userid]` on the table `coin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `coinflip` MODIFY `date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `roulette` MODIFY `date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `user` DROP COLUMN `admin`,
    ADD COLUMN `ForgotToken` VARCHAR(191) NULL,
    ADD COLUMN `ForgotTokenExpiresAt` DATETIME(3) NULL,
    ADD COLUMN `isBanned` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `profileImage` LONGBLOB NULL,
    ADD COLUMN `timeoutExpires` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `chatmessage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Coin_userid_key` ON `coin`(`userid`);
