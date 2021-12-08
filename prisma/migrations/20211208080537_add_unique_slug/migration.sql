/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `OrgPage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrgPage_slug_key" ON "OrgPage"("slug");
