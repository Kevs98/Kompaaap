import { TestBed } from '@angular/core/testing';

import { AsistHogarService } from './asist-hogar.service';

describe('AsistHogarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsistHogarService = TestBed.get(AsistHogarService);
    expect(service).toBeTruthy();
  });
});
