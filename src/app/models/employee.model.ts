import { SkillModel } from "./skill.model"

export interface EmployeeModel {
  id: number,
  employeeCode: string,
  firstName: string,
  middleName: string,
  lastName: string,
  department: number
  grade: number,
  reportingManger: number,
  skills: SkillModel[],
  skillsTitles: string,
  houseRent: number,
  otherAllowance: number
  totalSalaryPM: number,
  totalSalaryPA: number,
  basicSalary: number
}
