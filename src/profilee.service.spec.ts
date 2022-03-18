import { TestBed } from '@angular/core/testing';

import { ProfileeService } from './profilee.service';

describe('ProfileeService', () => {
  let service: ProfileeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
