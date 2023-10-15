-- CreateTable
CREATE TABLE "employee" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "full_name" TEXT NOT NULL,
    "date_of_birth" TEXT NOT NULL,
    "passport_series" TEXT NOT NULL,
    "about_me" TEXT NOT NULL,
    "project_count" INTEGER NOT NULL,
    "website" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "reject" INTEGER NOT NULL,
    "in_process" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "resolve" INTEGER NOT NULL,
    "general_skill" TEXT NOT NULL,
    "create_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);