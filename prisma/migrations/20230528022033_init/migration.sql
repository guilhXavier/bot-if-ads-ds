-- CreateEnum
CREATE TYPE "TokenStatus" AS ENUM ('SUCESS', 'AVAILABLE', 'EXPIRED');

-- CreateTable
CREATE TABLE "EnrolledStudent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "academicEmail" TEXT NOT NULL,

    CONSTRAINT "EnrolledStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisciplineEnrollment" (
    "id" SERIAL NOT NULL,
    "diaryId" INTEGER NOT NULL,
    "disciplineId" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,

    CONSTRAINT "DisciplineEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "tokenCode" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "status" "TokenStatus" NOT NULL DEFAULT 'AVAILABLE',
    "isExpired" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisciplineChannel" (
    "id" SERIAL NOT NULL,
    "diaryId" INTEGER NOT NULL,
    "disciplineId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,

    CONSTRAINT "DisciplineChannel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EnrolledStudent_enrollmentId_key" ON "EnrolledStudent"("enrollmentId");

-- CreateIndex
CREATE UNIQUE INDEX "EnrolledStudent_academicEmail_key" ON "EnrolledStudent"("academicEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Token_tokenCode_key" ON "Token"("tokenCode");

-- CreateIndex
CREATE UNIQUE INDEX "DisciplineChannel_disciplineId_key" ON "DisciplineChannel"("disciplineId");

-- CreateIndex
CREATE UNIQUE INDEX "DisciplineChannel_channelId_key" ON "DisciplineChannel"("channelId");
