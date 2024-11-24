-- AddForeignKey
ALTER TABLE "TransactionHistory" ADD CONSTRAINT "TransactionHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "LineUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
