-- CreateTable
CREATE TABLE "work" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "file_and_link" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "employer_id" UUID NOT NULL,
    "create_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "work_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "work" ADD CONSTRAINT "work_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "employer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
