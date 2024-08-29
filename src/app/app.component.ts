import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { CardComponent } from './components/card/card.component';
import { SkillsDropdownComponent } from "./components/skills-dropdown/skills-dropdown.component";
import { EmployeeFormComponent } from "./features/employee/employee-form/employee-form.component";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeTableComponent } from "./features/employee/employee-table/employee-table.component";
import { EmployeeModel } from './models/employee.model';

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
export class AppComponent {

  title = 'sample-project';

  employeeId: number | null = null;

  onEditRow(id: number) {
    this.employeeId = id;
  }
}
