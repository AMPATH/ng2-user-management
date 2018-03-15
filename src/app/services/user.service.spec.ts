import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { UserService } from './user.service';
import { SessionService } from './session.service';
import { SessionStorageService } from './session-storage.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        SessionService,
        SessionStorageService
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
