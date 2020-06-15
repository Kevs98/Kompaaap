import { TestBed } from '@angular/core/testing';

import { VIPservicesService } from './vipservices.service';

describe('VIPservicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VIPservicesService = TestBed.get(VIPservicesService);
    expect(service).toBeTruthy();
  });
});
