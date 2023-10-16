import { IsNotEmpty, IsUUID } from 'class-validator';

export class EmployeeSkillsDTO {
  @IsUUID()
  @IsNotEmpty()
  skill_id: string;

  @IsUUID()
  @IsNotEmpty()
  employee_id: string;
}
