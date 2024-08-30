import { NgFor, NgIf } from '@angular/common';
import { Component, forwardRef, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
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
  controlContainer = inject(ControlContainer, { optional: true });
  @Input() pattern: string | null = null;
  @Input() isRequired: boolean = true;
  @Input() minLength: number | null = null;
  @Input() maxLength: number | null = null;
  @Input() min: number | null = null;
  @Input() max: number | null = null;
  @Input({ required: true }) label: string = '';
  @Input({ required: true }) type: string | number = '';
  @Input() readOnly: boolean = false;
  formControlName = new FormControl<string | null>(null);
  value: string | number | null = null;
  isDisabled = false;

  ngOnChanges(): void {
    if (this.isRequired) {
      this.formControlName.addValidators(Validators.required)
    }
    if (this.pattern && this.pattern?.length > 0) {
      this.formControlName.addValidators(Validators.pattern(this.pattern))
    }
    if (this.min) {
      this.formControlName.addValidators(Validators.min(this.min))
    }
    if (this.max) {
      this.formControlName.addValidators(Validators.max(this.max))
    }
    if (this.minLength) {
      this.formControlName.addValidators(Validators.minLength(this.minLength))
    }
    if (this.maxLength) {
      this.formControlName.addValidators(Validators.maxLength(this.maxLength))
    }
    this.formControlName.updateValueAndValidity();
  }

  onChange: (value: string | number | null) => void = () => { };
  onTouched: () => void = () => { };

  writeValue(value: number | string | null): void {
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
    if ((event?.target as any)?.id === "Total Salary/PM" && +this.value >= 1000 && +this.value <= 120000) {
      (this.controlContainer as any).form?.controls["totalSalaryPA"]?.patchValue(+this.value * 12000);
    }
    this.onChange(this.value);
    this.onTouched();
  }

  get hasError(): boolean {
    return this.formControlName ? this.formControlName.invalid && (this.formControlName.dirty || this.formControlName.touched) : false;
  }

  get errorMessage(): string {
    if (this.formControlName?.errors?.['required']) {
      return 'This field is required';
    }

    if (this.formControlName.errors?.['pattern']) {
      return `
      First letter from left to right must be upper case alphabet from A to Z or “#” only.
      Next 3 or 4 characters must be numbers, after that following 2 characters is upper case
      alphabets
      Total length must be 8 or 10 characters only. In case of 10 characters, last 2 are digits
      and in case of 8 characters, last 1 character only is digit
      The correct example: A123AB1 or #1234CD12`;
    }

    if (this.type === "number" && this.formControlName.errors?.['min'])
      return `the value must be greater than ${this.min}`;

    if (this.type === "number" && this.formControlName.errors?.['max'])
      return `the value must be less than ${this.max}`;

    if (this.type === "text" && this.formControlName.errors?.['minlength'])
      return `the value length must be greater than ${this.minLength}`;

    if (this.type === "text" && this.formControlName.errors?.['maxlength'])
      return `the value length must be less than ${this.maxLength}`;

    return "";
  }

  get patternError(): string[] {
    if (this.formControlName.errors?.['pattern']) {
      return ['First letter from left to right must be upper case alphabet from A to Z or “#” /br']
    }
    return [""]
  }
}
