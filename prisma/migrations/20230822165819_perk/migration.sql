-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "perkId" INTEGER;

-- CreateTable
CREATE TABLE "Perk" (
    "id" SERIAL NOT NULL,
    "hashtag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Perk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExperienceToPerk" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Perk_hashtag_key" ON "Perk"("hashtag");

-- CreateIndex
CREATE UNIQUE INDEX "_ExperienceToPerk_AB_unique" ON "_ExperienceToPerk"("A", "B");

-- CreateIndex
CREATE INDEX "_ExperienceToPerk_B_index" ON "_ExperienceToPerk"("B");

-- AddForeignKey
ALTER TABLE "_ExperienceToPerk" ADD CONSTRAINT "_ExperienceToPerk_A_fkey" FOREIGN KEY ("A") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExperienceToPerk" ADD CONSTRAINT "_ExperienceToPerk_B_fkey" FOREIGN KEY ("B") REFERENCES "Perk"("id") ON DELETE CASCADE ON UPDATE CASCADE;
