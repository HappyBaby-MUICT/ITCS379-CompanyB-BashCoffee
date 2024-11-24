-- AddForeignKey
ALTER TABLE "UserCoupons" ADD CONSTRAINT "UserCoupons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "LineUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
