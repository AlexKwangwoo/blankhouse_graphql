/*
  Warnings:

  - You are about to drop the column `hashtag` on the `Perk` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Perk` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Perk` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Perk_hashtag_key";

-- AlterTable
ALTER TABLE "Perk" DROP COLUMN "hashtag",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Perk_name_key" ON "Perk"("name");
