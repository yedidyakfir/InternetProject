import { Component, OnInit } from '@angular/core';
import {ShoppingService} from "../../../services/ShoppingService/shopping.service";
import {Book} from "../../../model/book";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public books: Book[];
  constructor(public shopping:ShoppingService) { }

  ngOnInit() {
    this.shopping.getList().subscribe(res =>{
      this.books = res;
      console.log(res);
    });
  }

}
