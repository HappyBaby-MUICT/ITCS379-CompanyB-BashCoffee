/*
  Warnings:

  - A unique constraint covering the columns `[couponId]` on the table `UserCoupons` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `UserCoupons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserCoupons" ADD COLUMN     "amount" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserCoupons_couponId_key" ON "UserCoupons"("couponId");

-- AddForeignKey
ALTER TABLE "UserCoupons" ADD CONSTRAINT "UserCoupons_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
