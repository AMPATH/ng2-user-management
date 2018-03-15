import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { ManageService } from '../services/manage.service';
import { LocationService } from '../services/location.service';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  public userName: string;
  public selectedUser;
  public users = [];
  public userList = false;
  public searchTerm$ = new Subject<string>();
  public allOperationalSelected = false;
  public allAggregateSelected = false;
  public loading: Boolean = false;
  public operationalLocations = {
    selected: false,
    locations: []
  };
  public aggregateLocations = {
    selected: false,
    locations: []
  };
  public locations = [];
  public allLocations = new FormControl();
  public allAggregateLocations = new FormControl();
  public error = false;
  public errors = [];

  constructor(
    public dialog: MatDialog,
    private manageService: ManageService,
    private locationService: LocationService
  ) {  }

  ngOnInit() {
    this.manageService.getLocations().subscribe((data) => {
      this.locations = data;
      this.error = false;
    }, (err) => {
      this.error = true;
      this.errors.push('There was an error fetching locations.');
    });
  }

  public selectAllLocations() {
    this.allLocations = new FormControl(this.locations);
    this.allOperationalSelected = true;
    this.operationalLocations.selected = true;
  }

  public deselectAllLocations() {
    this.allLocations.reset();
    this.allOperationalSelected = false;
    this.operationalLocations.selected = false;
  }

  public selectAllAggregateLocations() {
    this.allAggregateLocations = new FormControl(this.locations);
    this.allAggregateSelected = true;
    this.aggregateLocations.selected = true;
  }

  public deselectAllAggregateLocations() {
    this.allAggregateLocations.reset();
    this.allAggregateSelected = false;
    this.aggregateLocations.selected = false;
  }

  public save() {
    this.loading = true;
    this.aggregateLocations.locations = this.allAggregateLocations.value;
    this.operationalLocations.locations = this.allLocations.value;
    const payload = this.manageService.generateUserPropertyPayload(this.selectedUser, this.operationalLocations, this.aggregateLocations);
    this.manageService.saveUserProperties(payload).subscribe((data) => {
      this.loading = false;
      this.error = false;
      this.openDialog(data);
    }, (err) => {
      this.loading = false;
      this.error = true;
      this.errors.push('There was error while saving locations.');
    });
  }

  public findUser(searchText) {
    if (this.userName && this.userName !== ' ') {
      this.searchTerm$.next(searchText);
      this.manageService.search(this.searchTerm$).subscribe((data) => {
        this.users = data;
        this.userList = true;
        this.error = false;
      }, (err) => {
        this.error = true;
        this.errors.push('There was an error searching the patient');
        this.errors = _.uniq(this.errors);
      });
    }
  }

  public userSelected(user) {
    if (user) {
      this.error = false;
    }
    this.userList = false;
    this.allLocations.reset();
    this.allAggregateLocations.reset();
    this.selectedUser = user;
    this.userName = this.selectedUser.username;
    const userProperties = user.userProperties;
    for (const key in userProperties) {
      if (/^grantAccessToLocationOperationalData/.test(key)) {
        if (userProperties[key] === '*') {
          this.selectAllLocations();
        } else {
          this.allOperationalSelected = false;
          const location = this.manageService.getLocationIdByUuid(userProperties[key], this.locations);
          this.operationalLocations.locations.push(location);
          this.allLocations = new FormControl(this.operationalLocations.locations);
        }
      } else if (/^grantAccessToLocationAggregateData/.test(key)) {
        if (userProperties[key] === '*') {
          this.selectAllAggregateLocations();
        } else {
          this.allAggregateSelected = false;
          const location = this.manageService.getLocationIdByUuid(userProperties[key], this.locations);
          this.aggregateLocations.locations.push(location);
          this.allAggregateLocations = new FormControl(this.aggregateLocations.locations);
        }
      }
    }
  }


  public openDialog(results): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: results
    });

    dialogRef.afterClosed().subscribe(() => {
      this.userSelected(results);
    });
  }

}
