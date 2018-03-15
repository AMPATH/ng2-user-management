import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { AppMaterialModule } from '../app-material.module';
import { TypeaheadModule } from 'ngx-bootstrap';
import { LoginComponent } from './login.component';
import { BuildVersionComponent } from '../build-version/build-version.component';
import { AuthenticationService } from '../services/authentication.service';
import { SessionService } from '../services/session.service';
import { SessionStorageService } from '../services/session-storage.service';
import { LocalStorageService } from '../services/local-storage.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent, BuildVersionComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TypeaheadModule.forRoot(),
        AppMaterialModule,
        HttpModule,
        RouterTestingModule
      ],
      providers: [
        AuthenticationService,
        SessionService,
        SessionStorageService,
        LocalStorageService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
