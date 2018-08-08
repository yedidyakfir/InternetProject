import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-login-nav-bar',
  templateUrl: './login-nav-bar.component.html',
  styleUrls: ['./login-nav-bar.component.css']
})
export class LoginNavBarComponent implements OnInit {
  username: string = '';
  password: string = '';
  isLogIn: Boolean = false;//
  userUrl = 'http://localhost:3000/users';
  constructor(private modalService: NgbModal, private http: HttpClient) { }

  ngOnInit() {
    // console.log(this.userUrl + '/register');
    // this.http.post(this.userUrl + '/register',{email:'yedidya',password:'kfiry'}).subscribe(res => console.log("s"));
  }

  open(modal) {
    this.modalService.open(modal,{size: "sm"});
  }
  login(modal) {

    //this.router.navigate(['logedNav', false]);
  }
}
