import { TestBed } from '@angular/core/testing';

import { Category.ServiceService } from './category.service.service';

describe('Category.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Category.ServiceService = TestBed.get(Category.ServiceService);
    expect(service).toBeTruthy();
  });
});
