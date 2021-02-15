import { TestBed } from '@angular/core/testing';

import { CardmethodService } from './cardmethod.service';

describe('CardmethodService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardmethodService = TestBed.get(CardmethodService);
    expect(service).toBeTruthy();
  });
});
