-- CreateTable
CREATE TABLE "test" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "test" TEXT NOT NULL,
    "course_id" UUID NOT NULL,

    CONSTRAINT "test_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "test" ADD CONSTRAINT "test_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
