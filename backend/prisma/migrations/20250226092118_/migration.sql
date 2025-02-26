-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_groupsNeve_fkey`;

-- DropIndex
DROP INDEX `User_groupsNeve_fkey` ON `user`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `email_verification_token` VARCHAR(191) NULL,
    ADD COLUMN `email_verified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `resetToken` VARCHAR(191) NULL,
    ADD COLUMN `resetTokenExpires` DATETIME(3) NULL,
    MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `admin` INTEGER NULL DEFAULT 0,
    MODIFY `groupsNeve` VARCHAR(191) NULL DEFAULT 'user';

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_groupsNeve_fkey` FOREIGN KEY (`groupsNeve`) REFERENCES `Groups`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;
