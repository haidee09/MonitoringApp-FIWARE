import { TestBed, inject } from '@angular/core/testing';

import { SocketAlertsService } from './socket-alerts.service';

describe('SocketAlertsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketAlertsService]
    });
  });

  it('should be created', inject([SocketAlertsService], (service: SocketAlertsService) => {
    expect(service).toBeTruthy();
  }));
});
