import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../model/user";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  @Input()
  public user:User;
  constructor() { }

  ngOnInit() {
  }

}
