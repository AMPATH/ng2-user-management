import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { SessionService } from './session.service';
import { SessionStorageService } from './session-storage.service';
import { Constants } from './constants';

@Injectable()
export class LocationService {

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

  public getLocations(forceRefresh?: boolean): Observable<any> {

    const params = new URLSearchParams();
    params.set('v', 'full');

    const url = this.baseUrl + '/ws/rest/v1/location';

    return this.http.get(url, {
        search: params
    }).map((response: Response) => {
      return response.json().results;
    });
  }

  public getLocationByUuid(uuid: string, cached: boolean = false, v: string = null) {

    let url = this.baseUrl + '/ws/rest/v1/location';
    url += '/' + uuid;

    const params: URLSearchParams = new URLSearchParams();

    params.set('v', 'full');
    const request = this.http.get(url, {
      search: params
    }).map((response: Response) => {
      return response.json();
    });
  }

}
