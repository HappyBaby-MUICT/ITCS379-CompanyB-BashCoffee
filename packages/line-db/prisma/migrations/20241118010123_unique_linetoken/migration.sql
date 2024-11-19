/*
  Warnings:

  - A unique constraint covering the columns `[lineToken]` on the table `LineUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LineUser_lineToken_key" ON "LineUser"("lineToken");
