import { Component, OnInit } from '@angular/core';
import * as env from '../../environments/environment';

@Component({
  selector: 'app-build-version',
  templateUrl: './build-version.component.html',
  styleUrls: ['./build-version.component.css']
})
export class BuildVersionComponent implements OnInit {

  public date: string;
  public version: string;

  constructor() { }

  ngOnInit() {
    const d = new Date( +env.environment.date );
    this.date = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
    this.version = env.environment.version;
  }

}
