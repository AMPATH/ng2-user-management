import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '../app-material.module';
import { HttpModule } from '@angular/http';
import { ManageComponent } from './manage.component';
import { ManageService } from '../services/manage.service';
import { LocationService } from '../services/location.service';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { SessionService } from '../services/session.service';
import { SessionStorageService } from '../services/session-storage.service';
import { LocalStorageService } from '../services/local-storage.service';

describe('ManageComponent', () => {
  let component: ManageComponent;
  let fixture: ComponentFixture<ManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageComponent ],
      imports: [
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        BrowserAnimationsModule
      ],
      providers: [
        ManageService,
        LocationService,
        UserService,
        AuthenticationService,
        SessionService,
        SessionStorageService,
        LocalStorageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
