import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, forwardRef, HostListener, inject, input, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedSkills.length > 0) {
      this.selectedSkills.map(item => {
        this.toggleSelection(item)
      })
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
  @Input() selectedSkills: SkillModel[] = [];
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
      this.selectedItems.splice(index, 1);
      this.filteredItems = this.filteredItems.map(item => {
        if (item.id === selectedItem.id) {
          item.isSelected = false
        }
        return item;
      });
    } else {
      this.selectedItems.push(selectedItem);
      this.filteredItems = this.filteredItems.map(item => {
        if (item.id === selectedItem.id) {
          item.isSelected = true
        }
        return item;
      });
    }
    this.searchControl.setValue('', { emitEvent: false });
    this.filterItems('');
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

  updateSelection(filteredItems: SkillModel[], selectedItems: SkillModel[]): SkillModel[] {
    const selectedItemIds = new Set(selectedItems.map(item => item.id));

    return filteredItems.map(item => ({
      ...item,
      isSelected: selectedItemIds.has(item.id),
    }));
  }
}

