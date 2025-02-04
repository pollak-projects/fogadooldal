-- AlterTable
ALTER TABLE `user` ADD COLUMN `groupsNeve` VARCHAR(191) NOT NULL DEFAULT 'user';

-- CreateTable
CREATE TABLE `Groups` (
    `name` VARCHAR(191) NOT NULL,
    `write` BOOLEAN NOT NULL DEFAULT false,
    `read` BOOLEAN NOT NULL DEFAULT false,
    `update` BOOLEAN NOT NULL DEFAULT false,
    `delete` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_groupsNeve_fkey` FOREIGN KEY (`groupsNeve`) REFERENCES `Groups`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
