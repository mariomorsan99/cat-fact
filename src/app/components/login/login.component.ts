import { Component, OnInit } from '@angular/core';
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  auth2: any;
  token: any;
  credencialeslistas: any;
  constructor() { }

  ngOnInit() {
    this.googleInit();
  }

  googleInit() {
    var gap=gapi;
    gapi.load('auth2', function() {
     var auth2 = gapi.auth2.init({
        client_id: '490795938037-siqqqkt33852ap9an4s7e9jjsea8qf95.apps.googleusercontent.com',
        fetch_basic_profile: false,
        cookiepolicy: 'single_host_origin',
        scope: 'profile'
      });

     auth2.signIn().then(function() {
        console.log(auth2.currentUser.get().getAuthResponse().id_token);
        localStorage.setItem('token', auth2.currentUser.get().getAuthResponse().id_token);
      });
    });

    this.credencialeslistas = 'autenticado';

  }

}
