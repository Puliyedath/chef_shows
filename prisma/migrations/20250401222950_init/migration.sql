-- CreateEnum
CREATE TYPE "Source" AS ENUM ('OTHER', 'NETFLIX', 'HULU', 'PRIME_VIDEO', 'DISNEY_PLUS');

-- CreateTable
CREATE TABLE "Shows" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "imdb" DOUBLE PRECISION NOT NULL,
    "rottenTomatoes" INTEGER NOT NULL,
    "source" "Source" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Shows_title_idx" ON "Shows"("title");

-- CreateIndex
CREATE INDEX "Shows_age_idx" ON "Shows"("age");
