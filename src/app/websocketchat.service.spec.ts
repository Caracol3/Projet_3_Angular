import { TestBed } from '@angular/core/testing';

import { WebsocketchatService } from './websocketchat.service';

describe('WebsocketchatService', () => {
  let service: WebsocketchatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketchatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
