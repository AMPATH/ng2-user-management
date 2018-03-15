import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TypeaheadModule } from 'ngx-bootstrap';
import { AppMaterialModule } from '../app-material.module';
import { HomeComponent } from './home.component';
import { ManageComponent } from '../manage/manage.component';
import { BuildVersionComponent } from '../build-version/build-version.component';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from '../services/authentication.service';
import { SessionService } from '../services/session.service';
import { SessionStorageService } from '../services/session-storage.service';
import { LocalStorageService } from '../services/local-storage.service';
import { ManageService } from '../services/manage.service';
import { UserService } from '../services/user.service';
import { LocationService } from '../services/location.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        ManageComponent,
        LoginComponent,
        BuildVersionComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        AppMaterialModule,
        TypeaheadModule.forRoot(),
        RouterTestingModule,
        HttpModule
      ],
      providers: [
        AuthenticationService,
        SessionService,
        SessionStorageService,
        MockBackend,
        LocalStorageService,
        ManageService,
        UserService,
        LocationService
      ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
