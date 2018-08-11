import { Component, OnInit } from '@angular/core';
import {Book} from "../../../model/book";
import {BookService} from "../../../services/BookService/book.service";
import * as $ from 'jquery';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  public books: Book[];
  constructor(private bookService: BookService) { }

  ngOnInit() {
    // console.log("I ahte this is idiotic");
    // this.http.get('http://localhost:3000/books/create')
    //   .subscribe(res => console.log('created success'));

    //I requesting the books data and store it in the array which is connected to the view
    this.bookService.getBookList().subscribe(bookRes => this.books = bookRes);

  }

}
