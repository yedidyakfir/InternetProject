import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/UserService/user.service";
import {User} from "../../../model/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User =new User();
  rePassword : string = '';
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user.password="";
    this.user.email="";
  }

  register() {
    console.log("get to register function");
    if (this.user.password != this.rePassword)
    {
      alert("password are not the same");
      return;
    }
    this.userService.register(this.user.email,this.user.password)
      .subscribe(res => {
        if(res == false)
          alert("something get wrong...");
      });
  }
}
