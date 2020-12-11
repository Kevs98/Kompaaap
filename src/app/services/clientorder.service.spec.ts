import { TestBed } from '@angular/core/testing';

import { ClientorderService } from './clientorder.service';

describe('ClientorderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientorderService = TestBed.get(ClientorderService);
    expect(service).toBeTruthy();
  });
});
