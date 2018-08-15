import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../../model/book";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  shoppingUrl = 'http://localhost:3000/shop';
  constructor(private http: HttpClient) { }

  addToCart(book:Book) {
    console.log("addToCart");
    book = new Book();
    book.name = "Kings Way";
    book.ISBN = 2018;
    console.log(book);
    this.http.post(this.shoppingUrl + '/addToCart', {book:book})
      .subscribe(res => {if(res != true) {alert(res);}});
  }
}
