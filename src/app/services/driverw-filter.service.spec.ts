import { TestBed } from '@angular/core/testing';

import { DriverwFilterService } from './driverw-filter.service';

describe('DriverwFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DriverwFilterService = TestBed.get(DriverwFilterService);
    expect(service).toBeTruthy();
  });
});
