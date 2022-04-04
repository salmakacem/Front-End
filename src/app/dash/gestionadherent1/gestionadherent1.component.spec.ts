import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gestionadherent1Component } from './gestionadherent1.component';

describe('Gestionadherent1Component', () => {
  let component: Gestionadherent1Component;
  let fixture: ComponentFixture<Gestionadherent1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Gestionadherent1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Gestionadherent1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
