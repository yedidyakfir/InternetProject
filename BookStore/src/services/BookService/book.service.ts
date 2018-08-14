import { Injectable } from '@angular/core';
import {Observable} from "rxjs/index";
import {Book} from "../../model/book";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  bookUrl = 'http://localhost:3000/books';
  constructor(private http: HttpClient) { }

  getBookList(): Observable<Book[]> {
    return this.http.get<Book[]>(this.bookUrl + '/list');
  }
}
