import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { LocationService } from './location.service';
import { SessionService } from './session.service';
import { SessionStorageService } from './session-storage.service';

describe('LocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocationService,
        SessionService,
        SessionStorageService
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should be created', inject([LocationService], (service: LocationService) => {
    expect(service).toBeTruthy();
  }));
});
