/*
  Warnings:

  - You are about to drop the column `userId` on the `Palmlet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[folderId,title]` on the table `Palmlet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `folderId` to the `Palmlet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Palmlet" DROP CONSTRAINT "Palmlet_userId_fkey";

-- DropIndex
DROP INDEX "Palmlet_userId_title_key";

-- AlterTable
ALTER TABLE "Palmlet" DROP COLUMN "userId",
ADD COLUMN     "folderId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "palmlet_folder" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "folderName" TEXT NOT NULL,
    "folderDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "palmlet_folder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Palmlet_folderId_title_key" ON "Palmlet"("folderId", "title");

-- AddForeignKey
ALTER TABLE "palmlet_folder" ADD CONSTRAINT "palmlet_folder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Palmlet" ADD CONSTRAINT "Palmlet_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "palmlet_folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
