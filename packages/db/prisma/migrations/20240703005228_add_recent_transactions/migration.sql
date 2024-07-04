-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('Received', 'Transfer');

-- CreateTable
CREATE TABLE "RecentTransaction" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "provider" TEXT,
    "amount" INTEGER NOT NULL,
    "status" "TransactionStatus" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "RecentTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecentTransaction" ADD CONSTRAINT "RecentTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
