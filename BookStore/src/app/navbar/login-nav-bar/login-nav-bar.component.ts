import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "../../../services/authentication-service.service";

@Component({
  selector: 'app-login-nav-bar',
  templateUrl: './login-nav-bar.component.html',
  styleUrls: ['./login-nav-bar.component.css']
})
export class LoginNavBarComponent implements OnInit {
  username: string = '';
  password: string = '';
  isLogIn: boolean = false;//
  constructor(private modalService: NgbModal, public auth: AuthenticationService) { }

  ngOnInit() {
    this.isLoggedIn();
    // console.log(this.userUrl + '/register');
    // this.http.post(this.userUrl + '/register',{email:'yedidya',password:'kfiry'}).subscribe(res => console.log("s"));
  }

  open(modal) {
    this.modalService.open(modal,{size: "lg"});
  }
  login(modal) {
    this.auth.login(this.username,this.password);
    this.isLoggedIn();
  }
  logout() {
    this.auth.logout();
    this.isLoggedIn();
  }
  isLoggedIn(){
    this.auth.isLogIn()
      .subscribe(success => {
        this.isLogIn = success
        console.log(this.isLogIn);
      });
  }
}
