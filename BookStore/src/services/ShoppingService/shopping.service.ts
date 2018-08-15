import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../../model/book";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  shoppingUrl = 'http://localhost:3000/shop';
  constructor(private http: HttpClient) { }

  addToCart(book:Book) {
    console.log("addToCart");
    console.log(book);
    this.http.post(this.shoppingUrl + '/addToCart', {book:book})
      .subscribe(res => {if(res != true) {alert(res);}});
  }

  getList(): Observable<Book> {
    return this.http.get<Book>(this.shoppingUrl +'/list');
  }
}
