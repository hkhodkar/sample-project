import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { EmployeesService } from '../../../services/employees.service';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class EmployeeTableComponent implements OnInit {


  data: any[] = [];
  columns: { key: string, value: string }[] = [
    { key: "Employee Code", value: "employeeCode" },
    { key: "First Name", value: "firstName" },
    { key: "Last Name", value: "lastName" },
    { key: "Department Title", value: "departmentTitle" },
    { key: "Department Title", value: "departmentTitle" },
    { key: "Grade Title", value: "gradeTitle" },
    { key: "Reporting Manger Name", value: "reportingMangerName" },
    { key: "Skills Titles", value: "skillsTitles" },
    { key: "House Rent", value: "houseRent" },
    { key: "Other Allowance", value: "otherAllowance" },
    { key: "Total Salary/PM", value: "totalSalaryPM" },
    { key: "Total Salary/PA", value: "totalSalaryPA" },
  ];
  @Output() editRow = new EventEmitter<any>();
  employeeService = inject(EmployeesService)

  currentPage: number = 1;
  itemsPerPage: number = 5;

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: res => this.data = res
    })
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.data.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  onEdit(row: number) {
    this.editRow.emit(row);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
