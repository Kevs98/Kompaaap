import { TestBed } from '@angular/core/testing';

import { ElectricidadVService } from './electricidad-v.service';

describe('ElectricidadVService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElectricidadVService = TestBed.get(ElectricidadVService);
    expect(service).toBeTruthy();
  });
});
