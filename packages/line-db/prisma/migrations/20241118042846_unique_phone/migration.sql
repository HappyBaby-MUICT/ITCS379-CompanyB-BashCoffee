/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `LineUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LineUser_phoneNumber_key" ON "LineUser"("phoneNumber");
