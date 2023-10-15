-- CreateTable
CREATE TABLE "petition" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "work_id" UUID NOT NULL,
    "employee_id" UUID NOT NULL,
    "employer_id" UUID NOT NULL,
    "create_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "petition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "petition" ADD CONSTRAINT "petition_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "work"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "petition" ADD CONSTRAINT "petition_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "petition" ADD CONSTRAINT "petition_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "employer"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
