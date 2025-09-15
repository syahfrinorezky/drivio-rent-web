/*
  Warnings:

  - A unique constraint covering the columns `[bookingId]` on the table `Bookings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookingId` to the `Bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Bookings` ADD COLUMN `bookingId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Bookings_bookingId_key` ON `Bookings`(`bookingId`);
