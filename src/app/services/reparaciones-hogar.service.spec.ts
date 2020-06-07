import { TestBed } from '@angular/core/testing';

import { ReparacionesHogarService } from './reparaciones-hogar.service';

describe('ReparacionesHogarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReparacionesHogarService = TestBed.get(ReparacionesHogarService);
    expect(service).toBeTruthy();
  });
});
