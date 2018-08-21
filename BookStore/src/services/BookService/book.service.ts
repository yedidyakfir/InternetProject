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
  private bookFilter: Subject<Book>;
  bookUrl = 'http://localhost:3000/books';
  constructor(private http: HttpClient) {
    this.bookFilter = new Subject<Book>();
    this.chosenBook = new Subject<Book>();
    this.books = new BehaviorSubject<Book[]>([]);
  }

  getBookList(skip:number = 0,limit:number = 0): Subject<Book[]> {
    this.http.post<Book[]>(this.bookUrl + '/list',{skip:skip,limit:limit})
      .subscribe(res => this.books.next(res));
    return this.books;
  }

  getMySells(): Observable<Book[]> {
    this.http.get(this.bookUrl + '/mySells').subscribe(res => console.log(res));
    return this.http.get<Book[]>(this.bookUrl + '/mySells');
  }

  getMyUnsold(): Observable<Book[]> {
    return this.http.get<Book[]>(this.bookUrl + '/myUnsold');
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

  changeFilter(filter:string) {
    let book = new Book();
    book.name = filter;
    this.bookFilter.next(book);
  }

  getFilter(): Subject<Book> {
    return this.bookFilter;
  }

}
