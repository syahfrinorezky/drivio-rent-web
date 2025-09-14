-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phoneNumber` VARCHAR(15) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `idImage` VARCHAR(255) NOT NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `role` ENUM('SUPERADMIN', 'ADMIN', 'CUSTOMER') NOT NULL DEFAULT 'CUSTOMER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vehicles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vehicleName` VARCHAR(50) NOT NULL,
    `type` ENUM('CAR', 'BIKE') NOT NULL,
    `seats` INTEGER NOT NULL,
    `modelYear` INTEGER NOT NULL,
    `pricePerDay` FLOAT NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `status` ENUM('AVAILABLE', 'BOOKED', 'MAINTENANCE') NOT NULL DEFAULT 'AVAILABLE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bookings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `vehicleId` INTEGER NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `endTime` DATETIME(3) NOT NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `note` LONGTEXT NOT NULL,
    `totalPrice` FLOAT NOT NULL,
    `paymentUrl` VARCHAR(255) NULL,
    `paymentId` VARCHAR(191) NULL,
    `paymentStatus` ENUM('PENDING', 'SUCCESS', 'FAILED') NOT NULL DEFAULT 'PENDING',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `vehicleId` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `comment` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bookings` ADD CONSTRAINT `Bookings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookings` ADD CONSTRAINT `Bookings_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
