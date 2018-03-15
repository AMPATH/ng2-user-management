import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { SessionStorageService } from './session-storage.service';
import { Constants } from './constants';

@Injectable()
export class SessionService {

  private url;

  constructor(private http: Http, private sessionStorageService: SessionStorageService) {
  }

  public getUrl(): string {
    return this.url;
  }

  public getSession(credentials: any = null, baseUrl: string) {
    this.url = baseUrl + '/ws/rest/v1/session';
    const headers = new Headers();
    if (credentials && credentials.username) {
      const base64 = btoa(credentials.username + ':' + credentials.password);
      headers.append('Authorization', 'Basic ' + base64);
    }

    return this.http.get(this.url, {
      headers: headers
    });
  }


  public deleteSession() {
    const url = this.sessionStorageService.getItem(Constants.BASE_URL) + '/ws/rest/v1/session';
    this.sessionStorageService.clear();
    return this.http.delete(url, {});
  }
}
