-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `last_login_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_phone_number_key`(`phone_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `manufacturer` (
    `id` VARCHAR(191) NOT NULL,
    `name` TEXT NOT NULL,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_series` (
    `id` VARCHAR(191) NOT NULL,
    `manufacturer_id` VARCHAR(191) NOT NULL,
    `name` TEXT NOT NULL,
    `release_year` INTEGER NOT NULL,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_model` (
    `id` VARCHAR(191) NOT NULL,
    `product_series_id` VARCHAR(191) NOT NULL,
    `name` TEXT NOT NULL,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `configuration` (
    `id` VARCHAR(191) NOT NULL,
    `ram` INTEGER NOT NULL,
    `color` VARCHAR(100) NOT NULL,
    `storage_capacity` VARCHAR(50) NOT NULL,
    `os_version` VARCHAR(50) NOT NULL,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `configuration_ram_color_storage_capacity_os_version_key`(`ram`, `color`, `storage_capacity`, `os_version`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_variant` (
    `id` VARCHAR(191) NOT NULL,
    `product_model_id` VARCHAR(191) NOT NULL,
    `configuration_id` VARCHAR(191) NOT NULL,
    `imei` VARCHAR(191) NOT NULL,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `product_variant_imei_key`(`imei`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventory` (
    `id` VARCHAR(191) NOT NULL,
    `product_variant_id` VARCHAR(191) NOT NULL,
    `price` DECIMAL(9, 2) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `inventory_product_variant_id_key`(`product_variant_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product_series` ADD CONSTRAINT `product_series_manufacturer_id_fkey` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_model` ADD CONSTRAINT `product_model_product_series_id_fkey` FOREIGN KEY (`product_series_id`) REFERENCES `product_series`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_variant` ADD CONSTRAINT `product_variant_product_model_id_fkey` FOREIGN KEY (`product_model_id`) REFERENCES `product_model`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_variant` ADD CONSTRAINT `product_variant_configuration_id_fkey` FOREIGN KEY (`configuration_id`) REFERENCES `configuration`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_product_variant_id_fkey` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
