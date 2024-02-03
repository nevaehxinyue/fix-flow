-- AlterTable
ALTER TABLE `User` ADD COLUMN `active` BOOLEAN NULL,
    ADD COLUMN `verifyToken` VARCHAR(191) NULL,
    ADD COLUMN `verifyTokenExpiry` DATETIME(3) NULL;
