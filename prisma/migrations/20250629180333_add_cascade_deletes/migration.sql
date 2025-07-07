-- DropForeignKey
ALTER TABLE "Palmlet" DROP CONSTRAINT "Palmlet_folderId_fkey";

-- DropForeignKey
ALTER TABLE "Palmlet_Folder" DROP CONSTRAINT "Palmlet_Folder_userId_fkey";

-- AddForeignKey
ALTER TABLE "Palmlet_Folder" ADD CONSTRAINT "Palmlet_Folder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Palmlet" ADD CONSTRAINT "Palmlet_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Palmlet_Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
