import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBoxInputComponent } from './select-box-input.component';

describe('SelectBoxInputComponent', () => {
  let component: SelectBoxInputComponent;
  let fixture: ComponentFixture<SelectBoxInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectBoxInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectBoxInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
