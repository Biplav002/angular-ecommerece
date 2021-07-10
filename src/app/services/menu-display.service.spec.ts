import { TestBed } from '@angular/core/testing';

import { MenuDisplayService } from './menu-display.service';

describe('MenuDisplayService', () => {
  let service: MenuDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
