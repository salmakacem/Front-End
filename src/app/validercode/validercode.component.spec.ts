import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidercodeComponent } from './validercode.component';

describe('ValidercodeComponent', () => {
  let component: ValidercodeComponent;
  let fixture: ComponentFixture<ValidercodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidercodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidercodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
