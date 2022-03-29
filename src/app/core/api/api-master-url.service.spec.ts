import { TestBed } from '@angular/core/testing';

import { ApiMasterUrlService } from './api-master-url.service';

describe('ApiMasterUrlService', () => {
  let service: ApiMasterUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMasterUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
