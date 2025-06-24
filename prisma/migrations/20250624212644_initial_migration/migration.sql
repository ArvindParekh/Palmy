-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Palmlet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Palmlet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Palmlet_Tag" (
    "id" TEXT NOT NULL,
    "tagName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Palmlet_Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Palmlet_Variable" (
    "id" TEXT NOT NULL,
    "variableName" TEXT NOT NULL,

    CONSTRAINT "Palmlet_Variable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PalmletToPalmlet_Tag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PalmletToPalmlet_Tag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PalmletToPalmlet_Variable" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PalmletToPalmlet_Variable_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Palmlet_userId_title_key" ON "Palmlet"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Palmlet_Tag_tagName_key" ON "Palmlet_Tag"("tagName");

-- CreateIndex
CREATE UNIQUE INDEX "Palmlet_Variable_variableName_key" ON "Palmlet_Variable"("variableName");

-- CreateIndex
CREATE INDEX "_PalmletToPalmlet_Tag_B_index" ON "_PalmletToPalmlet_Tag"("B");

-- CreateIndex
CREATE INDEX "_PalmletToPalmlet_Variable_B_index" ON "_PalmletToPalmlet_Variable"("B");

-- AddForeignKey
ALTER TABLE "Palmlet" ADD CONSTRAINT "Palmlet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PalmletToPalmlet_Tag" ADD CONSTRAINT "_PalmletToPalmlet_Tag_A_fkey" FOREIGN KEY ("A") REFERENCES "Palmlet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PalmletToPalmlet_Tag" ADD CONSTRAINT "_PalmletToPalmlet_Tag_B_fkey" FOREIGN KEY ("B") REFERENCES "Palmlet_Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PalmletToPalmlet_Variable" ADD CONSTRAINT "_PalmletToPalmlet_Variable_A_fkey" FOREIGN KEY ("A") REFERENCES "Palmlet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PalmletToPalmlet_Variable" ADD CONSTRAINT "_PalmletToPalmlet_Variable_B_fkey" FOREIGN KEY ("B") REFERENCES "Palmlet_Variable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
