import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { SessionStorageService } from '../services/session-storage.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Constants } from '../services/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user;
  public currentUrl;
  public loggingOut = false;

  constructor (
    private router: Router,
    private auth: AuthenticationService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    const credentials = JSON.parse(this.sessionStorageService.getItem(Constants.USER_KEY));
    this.user = credentials;
    this.currentUrl = this.router.url;
  }

  public logout() {
    this.loggingOut = true;
    this.auth.logOut()
    .subscribe((res) => {
      this.router.navigate(['/login']);
    }, (err) => {
      this.router.navigate([this.currentUrl]);
    });
  }

}
