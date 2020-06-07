import { TestBed } from '@angular/core/testing';

import { AsistenciaCarreteraService } from './asistencia-carretera.service';

describe('AsistenciaCarreteraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsistenciaCarreteraService = TestBed.get(AsistenciaCarreteraService);
    expect(service).toBeTruthy();
  });
});
