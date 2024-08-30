import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SkillsDropdownComponent } from '../../../components/skills-dropdown/skills-dropdown.component';
import { CommonModule } from '@angular/common';
import { SelectBoxInputComponent } from '../../../components/select-box-input/select-box-input.component';
import { DepartmentsService } from '../../../services/departments.service';
import { InputComponent } from "../../../components/input/input.component";
import { GradeService } from '../../../services/grade.service';
import { ReportingManagerService } from '../../../services/reporting-manager.service';
import { EmployeesService } from '../../../services/employees.service';
import { EmployeeModel } from '../../../models/employee.model';
import { SkillModel } from '../../../models/skill.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule, SkillsDropdownComponent, CommonModule, SelectBoxInputComponent, InputComponent],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnChanges {

  employeeService = inject(EmployeesService);
  skillItems: any;
  grade: number | null = null;
  reportingManager: number | null = null;
  departmentName: number | null = null;
  @Output() saveEmployee = new EventEmitter();
  ngOnChanges(): void {
    if (!this.employeeId) return;
    this.employeeService.findById(this.employeeId)
      .subscribe({
        next: (employee) => {
          this.skillItems = [...employee!.skills];
          this.grade = employee!.grade;
          this.reportingManager = employee!.reportingManger;
          this.departmentName = employee!.department;
          this.form.patchValue({
            id: employee!.id,
            firstName: employee!.firstName,
            middleName: employee!.middleName,
            lastName: employee!.lastName,
            houseRent: +employee!.houseRent,
            basicSalary: +employee!.basicSalary,
            otherAllowance: employee!.otherAllowance,
            totalSalaryPM: +employee!.totalSalaryPM,
            totalSalaryPA: (employee!.totalSalaryPM * 12).toString(),
            grade: employee!.grade,
            reportingManger: employee!.reportingManger,
            employeeCode: employee!.employeeCode,
            department: employee!.department,
            selectedSkills: employee!.skills,
            selectedTitle: employee!.skillsTitles,
          });
        }
      })
  }


  @Input() employeeId: number | null = null;
  departments$ = inject(DepartmentsService).getDepartments();
  grade$ = inject(GradeService).getGrades();
  reportingManger$ = inject(ReportingManagerService).getReportingMangers();

  form = new FormGroup({
    id: new FormControl<number | null>(null),
    firstName: new FormControl<string>(""),
    middleName: new FormControl<string>(""),
    lastName: new FormControl<string>(""),
    houseRent: new FormControl<number | null>(null),
    basicSalary: new FormControl<number | null>(null),
    otherAllowance: new FormControl<number | null>(null),
    totalSalaryPM: new FormControl<number | null>(null),
    totalSalaryPA: new FormControl<string | null>(null),
    grade: new FormControl<number | null>(1),
    reportingManger: new FormControl<number | null>(1),
    employeeCode: new FormControl<string | number>('', Validators.compose([Validators.required, Validators.pattern('^([A-Z#]\d{3,4}[A-Z]{2})(\d{2}|\d{1})$')])),
    department: new FormControl<number | null>(1),
    selectedSkills: new FormControl<SkillModel[]>([]),
    selectedTitle: new FormControl<string>(""),
  });

  getFormControl(name: string) {
    return this.form.get(name) as FormControl<number | string | string[]>;
  }

  get selectedItemsControl() {
    return this.form.get('selectedSkills') as FormControl<SkillModel[]>;
  }


  onSubmit() {
    this.saveEmployee.emit(this.form.value);
    this.form.reset();
  }
}
