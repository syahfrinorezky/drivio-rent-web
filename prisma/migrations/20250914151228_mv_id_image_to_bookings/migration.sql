/*
  Warnings:

  - You are about to drop the column `idImage` on the `Users` table. All the data in the column will be lost.
  - Added the required column `idImage` to the `Bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Bookings` ADD COLUMN `idImage` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `idImage`;
