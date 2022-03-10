import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneventComponent } from './gestionevent.component';

describe('GestioneventComponent', () => {
  let component: GestioneventComponent;
  let fixture: ComponentFixture<GestioneventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestioneventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioneventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
