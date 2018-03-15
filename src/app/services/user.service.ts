import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { SessionService } from './session.service';
import { SessionStorageService } from './session-storage.service';
import { Constants } from './constants';

@Injectable()
export class UserService {

  private url;
  private baseUrl = '';
  private headers = new Headers();

  constructor(
    private http: Http,
    private sessionStorageService: SessionStorageService) {
      const credentials = sessionStorageService.getItem(Constants.CREDENTIALS_KEY);
      this.baseUrl = sessionStorageService.getItem(Constants.BASE_URL);
      this.headers.append('Authorization', 'Basic ' + credentials);
      this.headers.append('Content-Type', 'application/json');
  }

  public searchUsers(searchText: string, cached: boolean = false): Observable<any> {
    const params: URLSearchParams = new URLSearchParams();
    // params.set('q', searchText);
    // params.set('v', 'default');

    const url: string = this.baseUrl + '/ws/rest/v1/user?q=' + searchText + '&v=full';

    return this.http.get(url)
    .map((response: Response) => {
      return response.json().results;
    });
  }

  public search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchUsers(term));
  }

  public saveUserProperties(payload): Observable<any> {
    const url = this.baseUrl + '/ws/rest/v1/user/' + payload.uuid + '?v=full';
    const options = new RequestOptions({ headers: this.headers });
    const pay = {
      userProperties : payload.userProperties
    };
    return this.http.post(url, pay, options)
    .map((response: Response) => {
      return response.json();
    });
  }

}
