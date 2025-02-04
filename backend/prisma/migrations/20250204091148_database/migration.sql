/*
  Warnings:

  - You are about to drop the column `delete` on the `groups` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `groups` DROP COLUMN `delete`,
    ADD COLUMN `del` BOOLEAN NOT NULL DEFAULT false;
