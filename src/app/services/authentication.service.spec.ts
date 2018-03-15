import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { AuthenticationService } from './authentication.service';
import { SessionService } from './session.service';
import { SessionStorageService } from './session-storage.service';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        SessionService,
        SessionStorageService
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
