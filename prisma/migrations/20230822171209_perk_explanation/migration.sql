/*
  Warnings:

  - Added the required column `details` to the `Perk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Perk" ADD COLUMN     "details" TEXT NOT NULL,
ADD COLUMN     "explanation" TEXT;
