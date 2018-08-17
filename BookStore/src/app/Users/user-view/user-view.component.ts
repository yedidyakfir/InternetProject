import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../model/user";
import {UserService} from "../../../services/UserService/user.service";

@Component({
  selector: '[app-user-view]',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  @Input() public user:User;

  public oldUserEmail :string;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.oldUserEmail = this.user.email;
  }

  public UpdateUser(userEmail,userPassword)
  {
    this.userService.updateUser(this.oldUserEmail,userEmail,userPassword).subscribe();
  }

  public DeleteUser(userEmail)
  {
    this.userService.deleteUser(userEmail).subscribe();
  }
}
