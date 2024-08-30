import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { CardComponent } from './components/card/card.component';
import { SkillsDropdownComponent } from "./components/skills-dropdown/skills-dropdown.component";
import { EmployeeFormComponent } from "./features/employee/employee-form/employee-form.component";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeTableComponent } from "./features/employee/employee-table/employee-table.component";
import { EmployeeModel } from './models/employee.model';
import { EmployeesService } from './services/employees.service';
import { GradeService } from './services/grade.service';
import { DepartmentsService } from './services/departments.service';
import { ReportingManagerService } from './services/reporting-manager.service';
import { DropDownDataModel } from './models/dropdown-data.model';
import { SkillsService } from './services/skills.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    CardComponent,
    EmployeeFormComponent,
    ReactiveFormsModule,
    CommonModule,
    EmployeeTableComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  employeeService = inject(EmployeesService);
  gradeService = inject(GradeService);
  departmentService = inject(DepartmentsService);
  reportingManagerService = inject(ReportingManagerService);
  skillService = inject(SkillsService);

  data: any = [];
  grades: DropDownDataModel[] = [];
  departments: DropDownDataModel[] = [];
  reportingManagers: DropDownDataModel[] = [];
  skills: DropDownDataModel[] = [];
  columns = [
    { key: "Employee Code", value: "employeeCode" },
    { key: "First Name", value: "firstName" },
    { key: "Last Name", value: "lastName" },
    { key: "Department Title", value: "departmentTitle" },
    { key: "Grade Title", value: "gradeTitle" },
    { key: "Reporting Manger Name", value: "reportingMangerName" },
    { key: "Skills Titles", value: "skillsTitles" },
    { key: "House Rent", value: "houseRent" },
    { key: "Other Allowance", value: "otherAllowance" },
    { key: "Total Salary/PM", value: "totalSalaryPM" },
    { key: "Total Salary/PA", value: "totalSalaryPA" },
  ]

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: res => this.data = res
    })
    this.gradeService.getGrades().subscribe(res => {
      this.grades = res;
    })
    this.reportingManagerService.getReportingMangers().subscribe(res => {
      this.reportingManagers = res;
    })
    this.departmentService.getDepartments().subscribe(res => {
      this.departments = res;
    })
    this.skillService.getSkills().subscribe(res => {
      this.skills = res;
    })
  }

  title = 'sample-project';

  employeeId: number | null = null;

  onEditRow(id: number) {
    this.employeeId = id;
  }

  onSaveEmployee(employee: EmployeeModel): void {
    const index = this.data.findIndex((item: EmployeeModel) => item.id === employee.id);
    employee.reportingMangerName = this.reportingManagers.find(item => item.id == employee.reportingManger)?.value;
    employee.gradeTitle = this.grades.find(item => item.id == employee.grade)?.value;
    employee.departmentTitle = this.departments.find(item => item.id == employee.department)?.value;
    debugger;
    let selectedSkills = employee.selectedSkills.map(item => item.id);
    employee.skillsTitles = this.skills.filter(skill => selectedSkills.includes(skill.id)).map(item => item.value).join(", ");
    if (index === -1) {

      this.data = [{ ...employee }, ...this.data]
    } else {
      this.data.splice(index, 1, employee)
    }
  }
}
