import { TestBed } from '@angular/core/testing';

import { EventimageService } from './eventimage.service';

describe('EventimageService', () => {
  let service: EventimageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventimageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
