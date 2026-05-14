/*
  Warnings:

  - You are about to drop the column `completed` on the `Task` table. All the data in the column will be lost.
  - Added the required column `level` to the `StudyPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Level" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('THEORY', 'PRACTICE', 'PROJECT');

-- CreateEnum
CREATE TYPE "DifficultyRating" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "AchievementType" AS ENUM ('STREAK', 'MODULE_COMPLETED', 'PLAN_COMPLETED', 'PRACTICE_FOCUSED');

-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('FRONTEND', 'BACKEND', 'MOBILE', 'DEVOPS', 'AI', 'GAMES');

-- CreateEnum
CREATE TYPE "Preference" AS ENUM ('MORE_JOBS', 'MODERN_TECH', 'BOTH');

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('ZERO', 'BEGINNER', 'INTERMEDIATE');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Language" ADD VALUE 'TYPESCRIPT';
ALTER TYPE "Language" ADD VALUE 'CSHARP';
ALTER TYPE "Language" ADD VALUE 'GO';
ALTER TYPE "Language" ADD VALUE 'RUST';
ALTER TYPE "Language" ADD VALUE 'KOTLIN';
ALTER TYPE "Language" ADD VALUE 'SWIFT';
ALTER TYPE "Language" ADD VALUE 'PHP';
ALTER TYPE "Language" ADD VALUE 'RUBY';
ALTER TYPE "Language" ADD VALUE 'C';
ALTER TYPE "Language" ADD VALUE 'CPP';
ALTER TYPE "Language" ADD VALUE 'DART';

-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "description" TEXT,
ADD COLUMN     "estimatedHours" INTEGER,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "StudyPlan" ADD COLUMN     "description" TEXT,
ADD COLUMN     "estimatedDays" INTEGER,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "level" "Level" NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "completed",
ADD COLUMN     "difficultyRating" "DifficultyRating",
ADD COLUMN     "estimatedMinutes" INTEGER,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" "TaskType" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastStudiedAt" TIMESTAMP(3),
ADD COLUMN     "streak" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "UserOnboarding" (
    "id" SERIAL NOT NULL,
    "goal" "Goal" NOT NULL,
    "preference" "Preference" NOT NULL,
    "region" TEXT NOT NULL,
    "experienceLevel" "ExperienceLevel" NOT NULL,
    "recommendedLanguage" "Language" NOT NULL,
    "recommendedStack" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserOnboarding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudySession" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "minutesStudied" INTEGER NOT NULL,
    "tasksCompleted" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "StudySession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "AchievementType" NOT NULL,
    "unlockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shareableUrl" TEXT,
    "userId" INTEGER NOT NULL,
    "studyPlanId" INTEGER NOT NULL,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserOnboarding_userId_key" ON "UserOnboarding"("userId");

-- AddForeignKey
ALTER TABLE "UserOnboarding" ADD CONSTRAINT "UserOnboarding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudySession" ADD CONSTRAINT "StudySession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_studyPlanId_fkey" FOREIGN KEY ("studyPlanId") REFERENCES "StudyPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
