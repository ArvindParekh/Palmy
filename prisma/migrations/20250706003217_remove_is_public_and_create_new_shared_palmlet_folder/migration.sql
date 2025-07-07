/*
  Warnings:

  - You are about to drop the column `isPublic` on the `Palmlet` table. All the data in the column will be lost.
  - You are about to drop the column `upvotes` on the `Palmlet` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SharedPalmletTags" AS ENUM ('LinkedIn', 'Outreach', 'Networking', 'FollowUp', 'Interview', 'PostInterview', 'CoverLetter', 'Startups', 'ColdEmail');

-- AlterTable
ALTER TABLE "Palmlet" DROP COLUMN "isPublic",
DROP COLUMN "upvotes";

-- CreateTable
CREATE TABLE "shared_palmlet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "tags" "SharedPalmletTags"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shared_palmlet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Palmlet_VariableToSharedPalmlet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_Palmlet_VariableToSharedPalmlet_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_Palmlet_VariableToSharedPalmlet_B_index" ON "_Palmlet_VariableToSharedPalmlet"("B");

-- AddForeignKey
ALTER TABLE "shared_palmlet" ADD CONSTRAINT "shared_palmlet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Palmlet_VariableToSharedPalmlet" ADD CONSTRAINT "_Palmlet_VariableToSharedPalmlet_A_fkey" FOREIGN KEY ("A") REFERENCES "Palmlet_Variable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Palmlet_VariableToSharedPalmlet" ADD CONSTRAINT "_Palmlet_VariableToSharedPalmlet_B_fkey" FOREIGN KEY ("B") REFERENCES "shared_palmlet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
