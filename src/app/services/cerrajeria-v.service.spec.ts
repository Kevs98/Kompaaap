import { TestBed } from '@angular/core/testing';

import { CerrajeriaVService } from './cerrajeria-v.service';

describe('CerrajeriaVService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CerrajeriaVService = TestBed.get(CerrajeriaVService);
    expect(service).toBeTruthy();
  });
});
