import { TestBed } from '@angular/core/testing';

import { EmailInPlaceholderService } from './email-in-placeholder.service';

describe('EmailInPlaceholderService', () => {
  let service: EmailInPlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailInPlaceholderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
