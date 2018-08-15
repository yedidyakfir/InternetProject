import { Component, OnInit } from '@angular/core';
import {Book} from "../../../model/book";
import {BookService} from "../../../services/BookService/book.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  public books:Book[] = [];
  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getBookList()
      .subscribe(bookRes => this.books = bookRes);
  }

  public changeModalBook(newBook: Book) {
    console.log(newBook);
    this.books[0].photo = "";
  }
}
