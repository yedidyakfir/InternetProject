import { TestBed, inject } from '@angular/core/testing';

import { AdminGuradService } from './admin-gurad.service';

describe('AdminGuradService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuradService]
    });
  });

  it('should be created', inject([AdminGuradService], (service: AdminGuradService) => {
    expect(service).toBeTruthy();
  }));
});
