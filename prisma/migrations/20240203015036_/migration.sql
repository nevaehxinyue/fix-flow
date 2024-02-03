/*
  Warnings:

  - A unique constraint covering the columns `[forgotPasswordToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `forgotPasswordToken` VARCHAR(191) NULL,
    ADD COLUMN `forgotPasswordTokenExpiry` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_forgotPasswordToken_key` ON `User`(`forgotPasswordToken`);
