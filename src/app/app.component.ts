import { Component, OnInit } from '@angular/core';
declare function init_plugin();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'appAptude';

  constructor() { }

  ngOnInit() {
    init_plugin();
  }

}
