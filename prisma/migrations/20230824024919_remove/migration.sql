/*
  Warnings:

  - You are about to drop the `_AddOnServiceToRoom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AddOnServiceToRoom" DROP CONSTRAINT "_AddOnServiceToRoom_A_fkey";

-- DropForeignKey
ALTER TABLE "_AddOnServiceToRoom" DROP CONSTRAINT "_AddOnServiceToRoom_B_fkey";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "addOnServiceId" INTEGER;

-- DropTable
DROP TABLE "_AddOnServiceToRoom";

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_addOnServiceId_fkey" FOREIGN KEY ("addOnServiceId") REFERENCES "AddOnService"("id") ON DELETE SET NULL ON UPDATE CASCADE;
