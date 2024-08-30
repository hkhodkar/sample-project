import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit, inject, Input } from '@angular/core';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class EmployeeTableComponent {


  @Input() data: any[] = [];
  @Input() columns: { key: string, value: string }[] = [];
  @Output() editRow = new EventEmitter<any>();

  currentPage: number = 1;
  itemsPerPage: number = 5;


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
