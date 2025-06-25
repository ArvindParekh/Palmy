/*
  Warnings:

  - You are about to drop the `palmlet_folder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Palmlet" DROP CONSTRAINT "Palmlet_folderId_fkey";

-- DropForeignKey
ALTER TABLE "palmlet_folder" DROP CONSTRAINT "palmlet_folder_userId_fkey";

-- DropTable
DROP TABLE "palmlet_folder";

-- CreateTable
CREATE TABLE "Palmlet_Folder" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "folderName" TEXT NOT NULL,
    "folderDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Palmlet_Folder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Palmlet_Folder_userId_folderName_key" ON "Palmlet_Folder"("userId", "folderName");

-- AddForeignKey
ALTER TABLE "Palmlet_Folder" ADD CONSTRAINT "Palmlet_Folder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Palmlet" ADD CONSTRAINT "Palmlet_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Palmlet_Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
