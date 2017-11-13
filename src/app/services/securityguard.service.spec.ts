import { TestBed, inject } from '@angular/core/testing';

import { SecurityguardService } from './securityguard.service';

describe('SecurityguardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecurityguardService]
    });
  });

  it('should be created', inject([SecurityguardService], (service: SecurityguardService) => {
    expect(service).toBeTruthy();
  }));
});
