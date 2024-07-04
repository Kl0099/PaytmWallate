-- CreateTable
CREATE TABLE "Otp" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expireAfter" INTEGER NOT NULL DEFAULT 300,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Otp_number_key" ON "Otp"("number");
