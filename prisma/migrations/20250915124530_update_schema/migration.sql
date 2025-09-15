/*
  Warnings:

  - You are about to drop the column `idImage` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Users` table. All the data in the column will be lost.
  - Added the required column `identityImage` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand` to the `Vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gasType` to the `Vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transmission` to the `Vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Bookings` DROP COLUMN `idImage`,
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `identityImage` VARCHAR(255) NOT NULL,
    ADD COLUMN `licenseImage` VARCHAR(255) NULL,
    ADD COLUMN `withDriver` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `note` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `Reviews` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `address`,
    DROP COLUMN `name`,
    DROP COLUMN `phoneNumber`;

-- AlterTable
ALTER TABLE `Vehicles` ADD COLUMN `brand` VARCHAR(50) NOT NULL,
    ADD COLUMN `gasType` ENUM('GASOLINE', 'DIESEL', 'ELECTRIC', 'HYBRID') NOT NULL,
    ADD COLUMN `transmission` ENUM('MANUAL', 'AUTOMATIC') NOT NULL;

-- CreateTable
CREATE TABLE `CustomerProfiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `fullName` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `CustomerProfiles_userId_key`(`userId`),
    INDEX `CustomerProfiles_deletedAt_idx`(`deletedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdminProfiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `employeeId` VARCHAR(50) NOT NULL,
    `fullName` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `AdminProfiles_userId_key`(`userId`),
    UNIQUE INDEX `AdminProfiles_employeeId_key`(`employeeId`),
    INDEX `AdminProfiles_deletedAt_idx`(`deletedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Drivers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `licenseNumber` VARCHAR(50) NOT NULL,
    `contractStart` DATETIME(3) NOT NULL,
    `contractEnd` DATETIME(3) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Drivers_licenseNumber_key`(`licenseNumber`),
    INDEX `Drivers_status_idx`(`status`),
    INDEX `Drivers_deletedAt_idx`(`deletedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmailVerifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `otp` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiresAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `EmailVerifications_otp_key`(`otp`),
    INDEX `EmailVerifications_otp_idx`(`otp`),
    INDEX `EmailVerifications_expiresAt_idx`(`expiresAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PasswordResets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiresAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PasswordResets_token_key`(`token`),
    INDEX `PasswordResets_expiresAt_idx`(`expiresAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Bookings_status_idx` ON `Bookings`(`status`);

-- CreateIndex
CREATE INDEX `Bookings_paymentStatus_idx` ON `Bookings`(`paymentStatus`);

-- CreateIndex
CREATE INDEX `Bookings_deletedAt_idx` ON `Bookings`(`deletedAt`);

-- CreateIndex
CREATE INDEX `Bookings_startTime_endTime_idx` ON `Bookings`(`startTime`, `endTime`);

-- CreateIndex
CREATE INDEX `Reviews_deletedAt_idx` ON `Reviews`(`deletedAt`);

-- CreateIndex
CREATE INDEX `Users_role_idx` ON `Users`(`role`);

-- CreateIndex
CREATE INDEX `Users_deletedAt_idx` ON `Users`(`deletedAt`);

-- CreateIndex
CREATE INDEX `Vehicles_type_idx` ON `Vehicles`(`type`);

-- CreateIndex
CREATE INDEX `Vehicles_brand_idx` ON `Vehicles`(`brand`);

-- CreateIndex
CREATE INDEX `Vehicles_status_idx` ON `Vehicles`(`status`);

-- CreateIndex
CREATE INDEX `Vehicles_deletedAt_idx` ON `Vehicles`(`deletedAt`);

-- AddForeignKey
ALTER TABLE `CustomerProfiles` ADD CONSTRAINT `CustomerProfiles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdminProfiles` ADD CONSTRAINT `AdminProfiles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmailVerifications` ADD CONSTRAINT `EmailVerifications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PasswordResets` ADD CONSTRAINT `PasswordResets_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `Bookings` RENAME INDEX `Bookings_userId_fkey` TO `Bookings_userId_idx`;

-- RenameIndex
ALTER TABLE `Bookings` RENAME INDEX `Bookings_vehicleId_fkey` TO `Bookings_vehicleId_idx`;

-- RenameIndex
ALTER TABLE `Reviews` RENAME INDEX `Reviews_userId_fkey` TO `Reviews_userId_idx`;

-- RenameIndex
ALTER TABLE `Reviews` RENAME INDEX `Reviews_vehicleId_fkey` TO `Reviews_vehicleId_idx`;
