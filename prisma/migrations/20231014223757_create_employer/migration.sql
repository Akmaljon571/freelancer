-- CreateTable
CREATE TABLE "employer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "full_name" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "date_of_birth" TEXT NOT NULL,
    "passport_series" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "create_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employer_pkey" PRIMARY KEY ("id")
);
