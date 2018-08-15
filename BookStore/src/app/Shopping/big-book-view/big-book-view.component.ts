import { Component, OnInit ,Input } from '@angular/core';
import {Book} from "../../../model/book";
import {ShoppingService} from "../../../services/ShoppingService/shopping.service";

@Component({
  selector: 'app-big-book-view',
  templateUrl: './big-book-view.component.html',
  styleUrls: ['./big-book-view.component.css']
})
export class BigBookViewComponent implements OnInit {
  public mybook:Book;
  constructor(private shopping:ShoppingService) { }

  ngOnInit() {
    this.mybook = new Book();
  }

  public changeBook(newBook: Book) {
    console.log(newBook);
    console.log(this.mybook);
    this.mybook = newBook;
  }

  public addToCart() {
    this.shopping.addToCart(this.mybook);
  }
}
