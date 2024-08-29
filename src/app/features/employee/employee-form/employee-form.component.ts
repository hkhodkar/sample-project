import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SkillsDropdownComponent } from '../../../components/skills-dropdown/skills-dropdown.component';
import { CommonModule } from '@angular/common';
import { SkillModel } from '../../../models/skill.model';
import { SelectBoxInputComponent } from '../../../components/select-box-input/select-box-input.component';
import { DepartmentsService } from '../../../services/departments.service';
import { InputComponent } from "../../../components/input/input.component";
import { GradeService } from '../../../services/grade.service';
import { ReportingManagerService } from '../../../services/reporting-manager.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule, SkillsDropdownComponent, CommonModule, SelectBoxInputComponent, InputComponent],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent {


  options = [{ id: 1, value: 'Option 1' }, { id: 2, value: 'Option 2' }];
  departments$ = inject(DepartmentsService).getSkills();
  grade$ = inject(GradeService).getGrades();
  reportingManger$ = inject(ReportingManagerService).getReportingMangers();

  form = new FormGroup({
    firstName: new FormControl<string>(""),
    middleName: new FormControl<string>(""),
    lastName: new FormControl<string>(""),
    houseRent: new FormControl<string>(""),
    BasicSalary: new FormControl<string>(""),
    otherAllowance: new FormControl<string>(""),
    selectedSkills: new FormControl<number[]>([], Validators.required),
    departmentName: new FormControl<number | null>(1),
    TotalSalaryPM: new FormControl<number | null>(null),
    TotalSalaryPA: new FormControl<number | null>(null),
    grade: new FormControl<number | null>(1),
    reportingManager: new FormControl<number | null>(1),
    employeeCode: new FormControl<string | number>('', Validators.compose([Validators.required, Validators.pattern('^([A-Z#]\d{3,4}[A-Z]{2})(\d{2}|\d{1})$')]))
  });

  getFormControl(name: string) {
    return this.form.get(name) as FormControl<number | string | string[]>;
  }

  get departmentNameControl() {
    return this.form.get('departmentName') as FormControl<number>;
  }

  onSubmit() {
    console.log('Selected Items:', this.form.value);
  }


}
