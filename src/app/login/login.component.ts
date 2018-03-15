import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authenticated: boolean;
  selectedValue: string;
  message: string;
  baseUrls: string[] = ['https://ngx.ampath.or.ke/test-amrs', 'https://ngx.ampath.or.ke/amrs'];

  constructor(
    private auth: AuthenticationService,
    private router: Router) {
    this.setMessage();
  }


  ngOnInit() {
  }

  login(credentials) {
    this.auth.setBaseUrl(credentials.baseUrl);
    this.auth.setCredentialsSubject(credentials.username, credentials.password);

    this.message = 'Logging in...';
    this.auth.authenticate(credentials.username, credentials.password, credentials.baseUrl)
    .subscribe((res) => {
      this.setMessage();
      if (this.auth.isLoggedIn) {
        this.authenticated = true;
        this.message = 'Success!';
        const redirectUrl = this.auth.redirectUrl ? this.auth.redirectUrl : '/home';
        this.router.navigate([redirectUrl]);
      } else {
        this.message = undefined;
        this.authenticated = false;
      }
    }, (error) => {
        return error;
    });
  }

  setMessage() {
    const str = (this.authenticated) ?  'in' : undefined;
    if (str) {
      this.message = 'Already Logged ' + str;
    }

  }

}
