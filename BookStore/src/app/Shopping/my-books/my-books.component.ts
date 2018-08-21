import { Component, OnInit } from '@angular/core';
import {Book} from "../../../model/book";
import {BookService} from "../../../services/BookService/book.service";

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {
  public unsold:Book[] = [];
  public sold:Book[] = [];
  constructor(public bookService: BookService) { }

  ngOnInit() {
    console.log("afdasd");
    this.bookService.getMySells()
      .subscribe(bookRes => {
        console.log("mine");
        this.sold = bookRes;
        console.log(bookRes);
      });

    this.bookService.getMyUnsold()
      .subscribe(bookres => this.unsold = bookres);
  }

}
