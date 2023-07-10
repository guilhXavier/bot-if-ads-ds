/*
  Warnings:

  - You are about to drop the column `disciplineId` on the `DisciplineChannel` table. All the data in the column will be lost.
  - You are about to drop the column `disciplineId` on the `DisciplineEnrollment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[diaryId]` on the table `DisciplineChannel` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "DisciplineChannel_disciplineId_key";

-- AlterTable
ALTER TABLE "DisciplineChannel" DROP COLUMN "disciplineId";

-- AlterTable
ALTER TABLE "DisciplineEnrollment" DROP COLUMN "disciplineId";

-- CreateIndex
CREATE UNIQUE INDEX "DisciplineChannel_diaryId_key" ON "DisciplineChannel"("diaryId");
