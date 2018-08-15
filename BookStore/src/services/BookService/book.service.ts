import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs/index";
import {Book} from "../../model/book";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Subject<Book[]>;
  private chosenBook: Subject<Book>;
  bookUrl = 'http://localhost:3000/books';
  constructor(private http: HttpClient) {
    this.chosenBook = new Subject<Book>();
    this.books = new Subject<Book[]>();
  }

  getBookList(skip:number = 0,limit:number = 0): Subject<Book[]> {
    this.http.post<Book[]>(this.bookUrl + '/list',{skip:skip,limit:limit})
      .subscribe(res => this.books.next(res));
    return this.books;
  }

  addBookToList(book:Book) {
  }

  chooseBook(book:Book) {
    console.log(this.chosenBook);
    this.chosenBook.next(book);
  }

  getChoosenBook():Subject<Book> {
    return this.chosenBook;
  }


}
