import { TestBed } from '@angular/core/testing';

import { FontaneriaService } from './fontaneria.service';

describe('FontaneriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FontaneriaService = TestBed.get(FontaneriaService);
    expect(service).toBeTruthy();
  });
});
