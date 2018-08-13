import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationService } from "../../../services/authentication-service.service";

@Component({
  selector: 'app-login-nav-bar',
  templateUrl: './login-nav-bar.component.html',
  styleUrls: ['./login-nav-bar.component.css']
})
export class LoginNavBarComponent implements OnInit {
  username: string = '';
  password: string = '';
  isLogIn: boolean = false;//is the user is logged in
  isAdmin: boolean = false;//is this user is an administrator
  constructor(private modalService: NgbModal, public auth: AuthenticationService) { }

  ngOnInit() {
    this.isLoggedIn();
    // console.log(this.userUrl + '/register');
    // this.http.post(this.userUrl + '/register',{email:'yedidya',password:'kfiry'}).subscribe(res => console.log("s"));
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
        console.log(success);
        this.isLogIn = success;
      });
    this.auth.isAdministrator()
      .subscribe(success => {
        this.isAdmin = success;
      });
  }
}
