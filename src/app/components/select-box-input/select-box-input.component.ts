import { Component, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, ReactiveFormsModule, FormControl, ControlContainer, FormGroup, Validators } from '@angular/forms';
import { DropDownDataModel } from '../../models/dropdown-data.model';

@Component({
  selector: 'app-select-box-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select-box-input.component.html',
  styleUrls: ['./select-box-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectBoxInputComponent),
      multi: true,
    },
  ],
})
export class SelectBoxInputComponent implements ControlValueAccessor {

  departmentName = new FormControl('', Validators.required);
  @Input({ required: true }) options!: DropDownDataModel[] | null;
  @Input() placeholder = '';
  @Input({ required: true }) label!: string;
  @Input() value: number | null = null;
  isDisabled = false;

  onChange: (value: number | null) => void = () => { };
  onTouched: () => void = () => { };

  writeValue(value: number | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onSelectionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.value = +selectElement.value;
    this.onChange(this.value);
    this.onTouched();
  }

  get hasError(): boolean {
    return this.departmentName?.value ? +this.departmentName?.value! > 0 : false;
  }

  get errorMessage(): string {
    if (this.departmentName?.errors?.['required']) {
      return 'This field is required';
    }
    return '';
  }
}
