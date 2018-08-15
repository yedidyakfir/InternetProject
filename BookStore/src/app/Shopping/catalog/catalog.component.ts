import { Component, OnInit } from '@angular/core';
import {Book} from "../../../model/book";
import {BookService} from "../../../services/BookService/book.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  private booksInPage: number = 9;
  private pageNumber:number = 0;

  public books:Book[] = [];
  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getBookList()
      .subscribe(bookRes => this.books = bookRes);
  }

  public addBook(book:Book) {
    this.books.push(book);
    console.log(this.books);
  }

  public getBooks() {
    this.bookService.getBookList(this.pageNumber * this.booksInPage, this.booksInPage)
      .subscribe(bookRes => this.books = bookRes);
    console.log(this.books);
  }

  public nextPage() {
    console.log("nexy");
    this.pageNumber += 1;
    this.getBooks();
  }

  public previousPage() {
    if(this.pageNumber > 0)
      this.pageNumber -= 1;
    this.getBooks();
  }

}
