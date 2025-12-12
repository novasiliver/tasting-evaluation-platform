/*
  Warnings:

  - You are about to drop the `certificate_types` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `certificates` MODIFY `awardLevel` ENUM('NONE', 'BRONZE', 'SILVER', 'GOLD', 'GRAND_GOLD') NOT NULL;

-- DropTable
DROP TABLE `certificate_types`;
