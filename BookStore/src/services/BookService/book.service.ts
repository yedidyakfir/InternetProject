import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs/index";
import {Book} from "../../model/book";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: BehaviorSubject<Book[]>;
  private chosenBook: Subject<Book>;
  bookUrl = 'http://localhost:3000/books';
  constructor(private http: HttpClient) {
    this.chosenBook = new Subject<Book>();
    this.books = new BehaviorSubject<Book[]>([]);
  }

  getBookList(skip:number = 0,limit:number = 0): Subject<Book[]> {
    this.http.post<Book[]>(this.bookUrl + '/list',{skip:skip,limit:limit})
      .subscribe(res => this.books.next(res));
    return this.books;
  }

  addBookToList(book:Book) {
    let newBooks = this.books.getValue();
    newBooks.push(book);
    this.books.next(newBooks);
  }

  chooseBook(book:Book) {
    console.log(this.chosenBook);
    this.chosenBook.next(book);
  }

  getChoosenBook():Subject<Book> {
    return this.chosenBook;
  }


}
