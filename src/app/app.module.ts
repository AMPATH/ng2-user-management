import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ManageComponent } from './manage/manage.component';
import { HomeComponent } from './home/home.component';

import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { LocalStorageService } from './services/local-storage.service';
import { SessionStorageService } from './services/session-storage.service';
import { SessionService } from './services/session.service';

import { TypeaheadModule } from 'ngx-bootstrap';
import { UserService } from './services/user.service';
import { ManageService } from './services/manage.service';
import { LocationService } from './services/location.service';
import { DialogComponent } from './shared/dialog/dialog.component';
import { BuildVersionComponent } from './build-version/build-version.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManageComponent,
    HomeComponent,
    DialogComponent,
    BuildVersionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppMaterialModule,
    NgSelectModule,
    TypeaheadModule.forRoot()
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    LocalStorageService,
    SessionService,
    SessionStorageService,
    UserService,
    ManageService,
    LocationService
  ],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
