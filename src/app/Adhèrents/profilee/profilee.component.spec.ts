import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileeComponent } from './profilee.component';

describe('ProfileeComponent', () => {
  let component: ProfileeComponent;
  let fixture: ComponentFixture<ProfileeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
