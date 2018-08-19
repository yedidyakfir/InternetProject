import { Component, OnInit } from '@angular/core';
import {ShoppingService} from "../../../services/ShoppingService/shopping.service";
import {Book} from "../../../model/book";
import {BehaviorSubject, Subject} from "rxjs/index";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public books: Book[];
  public totalPrice:BehaviorSubject<number>;
  constructor(public shopping:ShoppingService) { this.totalPrice = new BehaviorSubject<number>(2); }

  ngOnInit() {
    this.shopping.getList().subscribe(res =>{
      this.books = res;
      console.log(res);
      if(res.length > 0)
      {
        this.totalPrice.next(this.books.map(book => book.price as number)
          .reduce((a,b) => a + b).valueOf());
        console.log(this.totalPrice.getValue());
      }
    });
  }

}
