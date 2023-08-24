/*
  Warnings:

  - You are about to drop the column `addOnServiceId` on the `Room` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_addOnServiceId_fkey";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "addOnServiceId";

-- CreateTable
CREATE TABLE "_AddOnServiceToRoom" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AddOnServiceToRoom_AB_unique" ON "_AddOnServiceToRoom"("A", "B");

-- CreateIndex
CREATE INDEX "_AddOnServiceToRoom_B_index" ON "_AddOnServiceToRoom"("B");

-- AddForeignKey
ALTER TABLE "_AddOnServiceToRoom" ADD CONSTRAINT "_AddOnServiceToRoom_A_fkey" FOREIGN KEY ("A") REFERENCES "AddOnService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddOnServiceToRoom" ADD CONSTRAINT "_AddOnServiceToRoom_B_fkey" FOREIGN KEY ("B") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
