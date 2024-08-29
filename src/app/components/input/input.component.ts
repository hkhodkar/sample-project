import { NgIf } from '@angular/common';
import { Component, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor, OnChanges {

  @Input() pattern: string | null = null;
  @Input() minLength: number | null = null;
  @Input() maxLength: number | null = null;
  @Input() min: number | null = null;
  @Input() max: number | null = null;
  @Input({ required: true }) label: string = '';
  @Input({ required: true }) type: string | number = '';
  employeeFirstName = new FormControl<string | null>('', Validators.required);
  value: string | number | null = null;
  isDisabled = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.pattern && this.pattern?.length > 0) {
      this.employeeFirstName.addValidators(Validators.pattern(this.pattern))
    }
    if (this.min) {
      this.employeeFirstName.addValidators(Validators.min(this.min))
    }
    if (this.max) {
      this.employeeFirstName.addValidators(Validators.max(this.max))
    }
    if (this.minLength) {
      this.employeeFirstName.addValidators(Validators.minLength(this.minLength))
    }
    if (this.maxLength) {
      this.employeeFirstName.addValidators(Validators.maxLength(this.maxLength))
    }
    this.employeeFirstName.updateValueAndValidity();
  }

  onChange: (value: string | number | null) => void = () => { };
  onTouched: () => void = () => { };

  writeValue(value: number | string | null): void {
    console.log('aaa')
    this.value = value;
  }

  registerOnChange(fn: (value: number | string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const selectElement = event.target as HTMLInputElement;
    this.value = this.type === "number" ? +selectElement.value : selectElement.value;
    this.onChange(this.value);
    this.onTouched();
  }

  get hasError(): boolean {
    return this.employeeFirstName ? this.employeeFirstName.invalid && (this.employeeFirstName.dirty || this.employeeFirstName.touched) : false;
  }

  get errorMessage(): string {

    if (this.employeeFirstName?.errors?.['required']) {
      return 'This field is required';
    }
    if (this.employeeFirstName.errors?.['pattern']) {
      return 'pattern'
    }

    if (this.type === "number" && this.employeeFirstName.errors?.['min'])
      return `the value must be greater than ${this.min}`

    if (this.type === "number" && this.employeeFirstName.errors?.['max'])
      return `the value must be less than ${this.max}`

    if (this.type === "text" && this.employeeFirstName.errors?.['minlength'])
      return `the value length must be greater than ${this.minLength}`

    if (this.type === "text" && this.employeeFirstName.errors?.['maxlength'])
      return `the value length must be less than ${this.maxLength}`
    return '';
  }
}
