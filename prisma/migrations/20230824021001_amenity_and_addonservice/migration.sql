-- CreateTable
CREATE TABLE "Amenity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddOnService" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AddOnService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AmenityToRoom" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AddOnServiceToRoom" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AmenityToRoom_AB_unique" ON "_AmenityToRoom"("A", "B");

-- CreateIndex
CREATE INDEX "_AmenityToRoom_B_index" ON "_AmenityToRoom"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AddOnServiceToRoom_AB_unique" ON "_AddOnServiceToRoom"("A", "B");

-- CreateIndex
CREATE INDEX "_AddOnServiceToRoom_B_index" ON "_AddOnServiceToRoom"("B");

-- AddForeignKey
ALTER TABLE "_AmenityToRoom" ADD CONSTRAINT "_AmenityToRoom_A_fkey" FOREIGN KEY ("A") REFERENCES "Amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AmenityToRoom" ADD CONSTRAINT "_AmenityToRoom_B_fkey" FOREIGN KEY ("B") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddOnServiceToRoom" ADD CONSTRAINT "_AddOnServiceToRoom_A_fkey" FOREIGN KEY ("A") REFERENCES "AddOnService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddOnServiceToRoom" ADD CONSTRAINT "_AddOnServiceToRoom_B_fkey" FOREIGN KEY ("B") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
