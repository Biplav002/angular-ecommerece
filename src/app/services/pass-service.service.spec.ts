import { TestBed } from '@angular/core/testing';

import { PassServiceService } from './pass-service.service';

describe('PassServiceService', () => {
  let service: PassServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
