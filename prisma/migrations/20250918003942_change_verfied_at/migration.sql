/*
  Warnings:

  - The `isVerified` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `EmailVerifications` ADD COLUMN `used` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `isVerified`,
    ADD COLUMN `isVerified` DATETIME(3) NULL;
