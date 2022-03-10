import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionadherentsComponent } from './gestionadherents.component';

describe('GestionadherentsComponent', () => {
  let component: GestionadherentsComponent;
  let fixture: ComponentFixture<GestionadherentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionadherentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionadherentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
