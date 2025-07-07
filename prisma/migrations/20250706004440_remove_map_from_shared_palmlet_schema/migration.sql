/*
  Warnings:

  - You are about to drop the `shared_palmlet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Palmlet_VariableToSharedPalmlet" DROP CONSTRAINT "_Palmlet_VariableToSharedPalmlet_B_fkey";

-- DropForeignKey
ALTER TABLE "shared_palmlet" DROP CONSTRAINT "shared_palmlet_userId_fkey";

-- DropTable
DROP TABLE "shared_palmlet";

-- CreateTable
CREATE TABLE "SharedPalmlet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "tags" "SharedPalmletTags"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SharedPalmlet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SharedPalmlet" ADD CONSTRAINT "SharedPalmlet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Palmlet_VariableToSharedPalmlet" ADD CONSTRAINT "_Palmlet_VariableToSharedPalmlet_B_fkey" FOREIGN KEY ("B") REFERENCES "SharedPalmlet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
