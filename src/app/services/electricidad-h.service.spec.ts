import { TestBed } from '@angular/core/testing';

import { ElectricidadHService } from './electricidad-h.service';

describe('ElectricidadHService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElectricidadHService = TestBed.get(ElectricidadHService);
    expect(service).toBeTruthy();
  });
});
