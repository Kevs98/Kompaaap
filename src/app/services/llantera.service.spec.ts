import { TestBed } from '@angular/core/testing';

import { LlanteraService } from './llantera.service';

describe('LlanteraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LlanteraService = TestBed.get(LlanteraService);
    expect(service).toBeTruthy();
  });
});
