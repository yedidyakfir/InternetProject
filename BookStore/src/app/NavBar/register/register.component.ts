import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/UserService/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = '';
  rePassword : string = '';
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  register() {
    console.log("get to register function");
    if (this.password != this.rePassword)
    {
      alert("password are not the same");
      return;
    }
    this.userService.register(this.email,this.password)
      .subscribe(res => {
        if(res == false)
          alert("something get wrong...");
      });
  }
}
