import { TestBed } from '@angular/core/testing';

import { GlobalDrawerService } from './global-drawer.service';

describe('GlobalDrawerService', () => {
  let service: GlobalDrawerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalDrawerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
