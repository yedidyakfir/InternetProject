import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../../model/book";
import {BehaviorSubject, Observable, Subject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private bookList: BehaviorSubject<Book[]>;
  shoppingUrl = 'http://localhost:3000/shop';
  constructor(private http: HttpClient) { this.bookList = new BehaviorSubject<Book[]>([]);}

  addToCart(book:Book) {
    console.log("addToCart");
    console.log(book);
    this.http.post(this.shoppingUrl + '/addToCart', {book:book})
      .subscribe(res => {
        if(res != true) {alert(res);}
        else {
          let newList = this.bookList.getValue();
          newList.push(book);
          this.bookList.next(newList);
        }
      });
  }

  removeFromCart(book:Book) {
    this.http.post(this.shoppingUrl + '/removeFromCart', {book:book})
      .subscribe(res => {
        if(res != true) {alert(res);}
        else {
          let newList = this.bookList.getValue();
          let index = newList.indexOf(book);
          if(index !== -1)
            newList.splice(index,1);
          this.bookList.next(newList);
        }
      });
  }

  getList(): Subject<Book[]> {
    this.http.get<Book[]>(this.shoppingUrl +'/list')
      .subscribe(res => {
        this.bookList.next(res);
        console.log(res);
        console.log(this.bookList);
      });
    return this.bookList;
  }
}
