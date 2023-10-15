/*
  Warnings:

  - A unique constraint covering the columns `[passport_series]` on the table `employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[passport_series]` on the table `employer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `employer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `employer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `avatar` to the `employer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employee" ALTER COLUMN "about_me" DROP NOT NULL,
ALTER COLUMN "project_count" SET DEFAULT 0,
ALTER COLUMN "stars" SET DEFAULT 0,
ALTER COLUMN "reject" SET DEFAULT 0,
ALTER COLUMN "in_process" SET DEFAULT 0,
ALTER COLUMN "resolve" SET DEFAULT 0,
ALTER COLUMN "general_skill" DROP NOT NULL;

-- AlterTable
ALTER TABLE "employer" ADD COLUMN     "avatar" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "employee_passport_series_key" ON "employee"("passport_series");

-- CreateIndex
CREATE UNIQUE INDEX "employee_phone_key" ON "employee"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "employee_email_key" ON "employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employer_passport_series_key" ON "employer"("passport_series");

-- CreateIndex
CREATE UNIQUE INDEX "employer_phone_key" ON "employer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "employer_email_key" ON "employer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "team_title_key" ON "team"("title");
