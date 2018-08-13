import { Component, OnInit } from '@angular/core';
import {User} from "../../../model/user";
import {UserService} from "../../../services/UserService/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users: User[];

  constructor(private bookService: UserService) { }

  ngOnInit() {
    // this.http.get('http://localhost:3000/books/create')
    //   .subscribe(res => console.log('created success'));
	//new Array<T>()
    //I requesting the books data and store it in the array which is connected to the view
	let x =this.bookService.getBookList()
    x.subscribe(bookRes => this.users = bookRes);
  }

}
