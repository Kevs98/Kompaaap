import { TestBed } from '@angular/core/testing';

import { CerrajeriaHService } from './cerrajeria-h.service';

describe('CerrajeriaHService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CerrajeriaHService = TestBed.get(CerrajeriaHService);
    expect(service).toBeTruthy();
  });
});
