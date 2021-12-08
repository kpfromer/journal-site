-- CreateTable
CREATE TABLE "OrgPage" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "OrgPage_pkey" PRIMARY KEY ("id")
);
