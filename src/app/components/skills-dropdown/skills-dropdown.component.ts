import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, forwardRef, HostListener, inject, input, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { SkillModel } from '../../models/skill.model';
import { SkillsService } from '../../services/skills.service';

@Component({
  selector: 'app-skills-dropdown',
  templateUrl: './skills-dropdown.component.html',
  styleUrls: ['./skills-dropdown.component.scss'],
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, NgFor, NgIf],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SkillsDropdownComponent),
      multi: true
    }
  ]
})
export class SkillsDropdownComponent implements OnInit, OnChanges, ControlValueAccessor {

  controlContainer = inject(ControlContainer, { optional: true })
  ngOnChanges(): void {
    if (this.selectedSItems?.length > 0) {
      const selectedId = this.selectedSItems.map(item => item.id);
      this.filteredItems = this.filteredItems.map(item => {
        if (selectedId.includes(item.id)) {
          return {
            ...item,
            isSelected: true
          }
        } else {
          return {
            ...item,
            isSelected: false
          }
        }
      });
    }
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = (event.target as HTMLElement).closest('.dropdown-container');
    if (!clickedInside) {
      this.dropdownOpen = false;
    }
  }

  skillsService = inject(SkillsService);

  private onChange: (value: SkillModel[]) => void = () => { };
  private onTouched: () => void = () => { };

  items: SkillModel[] = [];
  filteredItems: SkillModel[] = [];
  searchControl = new FormControl('', Validators.required);
  selectedSkills = new FormControl([], Validators.required);
  @Input() selectedSItems: SkillModel[] = [];
  selectedItems: SkillModel[] = [];
  dropdownOpen = false;

  ngOnInit() {
    this.skillsService.getSkills().subscribe({
      next: (res) => this.items = this.filteredItems = res.map(item => {
        return {
          ...item,
          isSelected: false
        }
      })
    })
    this.searchControl.valueChanges.subscribe(value => {
      if (!value) return;
      this.filterItems(value);
    });
  }


  filterItems(searchTerm: string) {
    this.filteredItems = this.items.filter(item =>
      item.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  toggleSelection(selectedItem: SkillModel) {
    const index = this.selectedItems.findIndex(item => item.id == selectedItem.id);
    if (index > -1) {
      this.filteredItems = this.filteredItems.map(item => {
        if (item.id === selectedItem.id) {
          item.isSelected = false
        }
        return item;
      });
    } else {
      this.filteredItems = this.filteredItems.map(item => {
        if (item.id === selectedItem.id) {
          return {
            ...item,
            isSelected: true
          }
        } else {
          return item;
        }
      });
    }
    this.searchControl.setValue('', { emitEvent: false });
    this.selectedItems = [...this.filteredItems.filter(item => item.isSelected)];
    (this.controlContainer as any).form.controls["selectedSkills"].value.push(selectedItem);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  removeItem(selectedItem: SkillModel) {
    const index = this.selectedItems.findIndex(item => item.id === selectedItem.id);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    }
  }

  writeValue(value: SkillModel[]): void {
    this.selectedItems = value || [];
  }

  registerOnChange(fn: (value: SkillModel[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void { }

  checkedItems(item: SkillModel) {
    return this.selectedItems.includes(item)
  }

  get hasError(): boolean {
    return this.searchControl ? this.selectedItems.length === 0 && (this.searchControl.dirty || this.searchControl.touched) : false;
  }

  get errorMessage(): string {
    if (this.searchControl?.errors?.['required']) {
      return 'This field is required';
    }
    return '';
  }
}

