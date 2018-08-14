import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../../services/AuthenticationService/authentication.service";

@Component({
  selector: 'app-login-navbar',
  templateUrl: './login-navbar.component.html',
  styleUrls: ['./login-navbar.component.css']
})
export class LoginNavbarComponent implements OnInit {
  username: string = '';
  password: string = '';
  isLogIn: boolean = false;//is the user is logged in
  isAdmin: boolean = false;//is this user is an administrator

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.isLoggedIn();
  }

  login() {
    this.auth.login(this.username,this.password)
      .subscribe(res => {
        this.isLoggedIn();
      });
  }
  logout() {
    this.auth.logout()
      .subscribe(res => {
        this.isLoggedIn();
      });
  }
  isLoggedIn(){
    this.auth.isLogIn()
      .subscribe(success => {
        this.isLogIn = success;
      });
    this.auth.isAdministrator()
      .subscribe(success => {
        this.isAdmin = success;
      });
  }

}
