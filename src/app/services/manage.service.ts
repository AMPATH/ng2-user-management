import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs/';
import { UserService } from '../services/user.service';
import { LocationService } from '../services/location.service';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ManageService {

  constructor(
    private userService: UserService,
    private locationService: LocationService
  ) { }

  public search(terms: Observable<string>) {
    return terms.debounceTime(400)
    .distinctUntilChanged()
    .switchMap(term => this.userService.searchUsers(term));
  }

  public getLocations() {
    return this.locationService.getLocations();
  }

  public getLocationIdByUuid(uuid, locations): any {
    let _location = {};
    _.each(locations, function(location) {
      if ( uuid === location.uuid ) {
        _location = location;
      }
    });
    return _location;
  }
  public generateUserPropertyPayload(selectedUser, selectedLocations, aggregateLocations) {
    // first remove previous location access in selectedUser.userProperties
    const userProperties = selectedUser.userProperties || {};
    const payload = {
      uuid: '',
      userProperties: ''
    };

    for (const key in userProperties) {
      if (/^grantAccessToLocationOperationalData/.test(key)) {
        delete userProperties[key];
      }
    }

    // then now add the new location privileges
    if (selectedLocations.selected) {
      userProperties['grantAccessToLocationOperationalData[*]'] = '*';
    } else if (selectedLocations.locations !== null && selectedLocations.locations.length > 0) {
      for (let i = 0; i < selectedLocations.locations.length; i++) {
        userProperties['grantAccessToLocationOperationalData[' + i + ']'] = selectedLocations.locations[i].uuid;
      }
    }
    // location privileges for aggregate data
    for (const key in userProperties) {
      if (/^grantAccessToLocationAggregateData/.test(key)) {
        delete userProperties[key];
      }
    }

    if (aggregateLocations.selected) {
      userProperties['grantAccessToLocationAggregateData[*]'] = '*';
    } else if (aggregateLocations.locations !== null && aggregateLocations.locations.length > 0) {
      for (let i = 0; i < aggregateLocations.locations.length; i++) {
        userProperties['grantAccessToLocationAggregateData[' + i + ']'] = aggregateLocations.locations[i].uuid;
      }
    }

    // finally create payload and add uuid to identify selected user
    payload.uuid = selectedUser.uuid;
    payload.userProperties = userProperties;
    return payload;
  }

  saveUserProperties(payload) {
    return this.userService.saveUserProperties(payload);
  }

}
