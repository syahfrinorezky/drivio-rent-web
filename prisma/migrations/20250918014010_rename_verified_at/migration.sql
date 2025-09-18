/*
  Warnings:

  - You are about to drop the column `isVerified` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Users` DROP COLUMN `isVerified`,
    ADD COLUMN `verifiedAt` DATETIME(3) NULL;
