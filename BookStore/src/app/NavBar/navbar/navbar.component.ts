import { Component, OnInit } from '@angular/core';
import {BookService} from "../../../services/BookService/book.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public search:string = '';
  constructor(public bookService: BookService) { }

  ngOnInit() {
  }
}
