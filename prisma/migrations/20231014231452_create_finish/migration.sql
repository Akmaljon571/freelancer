-- CreateTable
CREATE TABLE "employee_courses" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "employee_id" UUID NOT NULL,
    "course_id" UUID NOT NULL,

    CONSTRAINT "employee_courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_skills" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "work_id" UUID NOT NULL,
    "skils_id" UUID NOT NULL,

    CONSTRAINT "work_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_skills" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "employee_id" UUID NOT NULL,
    "skils_id" UUID NOT NULL,

    CONSTRAINT "employee_skills_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employee_courses" ADD CONSTRAINT "employee_courses_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_courses" ADD CONSTRAINT "employee_courses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_skills" ADD CONSTRAINT "work_skills_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "work"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_skills" ADD CONSTRAINT "work_skills_skils_id_fkey" FOREIGN KEY ("skils_id") REFERENCES "skills"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_skills" ADD CONSTRAINT "employee_skills_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_skills" ADD CONSTRAINT "employee_skills_skils_id_fkey" FOREIGN KEY ("skils_id") REFERENCES "skills"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
