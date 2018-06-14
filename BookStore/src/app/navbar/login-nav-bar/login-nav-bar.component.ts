import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-nav-bar',
  templateUrl: './login-nav-bar.component.html',
  styleUrls: ['./login-nav-bar.component.css']
})
export class LoginNavBarComponent implements OnInit {
  username: string = '';
  password: string = '';
  constructor(private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
  }

  open(modal) {
    this.modalService.open(modal,{size: "sm"});
  }
  login(modal) {
    this.router.navigate(['logedNav', false]);
  }
}
