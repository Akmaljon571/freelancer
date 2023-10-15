-- CreateTable
CREATE TABLE "team" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);
