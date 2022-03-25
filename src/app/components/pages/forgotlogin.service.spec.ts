import { TestBed } from '@angular/core/testing';

import { ForgotloginService } from './forgotlogin.service';

describe('ForgotloginService', () => {
  let service: ForgotloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
