import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ManageService } from './manage.service';
import { UserService } from './user.service';
import { SessionService } from './session.service';
import { SessionStorageService } from './session-storage.service';
import { LocationService } from './location.service';

describe('ManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ManageService,
        UserService,
        SessionService,
        SessionStorageService,
        LocationService
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should be created', inject([ManageService], (service: ManageService) => {
    expect(service).toBeTruthy();
  }));
});
