-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('POINT_DEDUCT', 'POINT_INCREMENT', 'COUPON_REDEEM', 'COUPON_USE');

-- CreateTable
CREATE TABLE "TransactionHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" "TransactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TransactionHistory_pkey" PRIMARY KEY ("id")
);
