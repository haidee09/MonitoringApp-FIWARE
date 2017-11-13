import { TestBed, inject } from '@angular/core/testing';

import { CommonUserService } from './common-user.service';

describe('CommonUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonUserService]
    });
  });

  it('should be created', inject([CommonUserService], (service: CommonUserService) => {
    expect(service).toBeTruthy();
  }));
});
