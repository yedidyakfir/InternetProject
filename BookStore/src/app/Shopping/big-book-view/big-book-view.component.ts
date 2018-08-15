import { Component, OnInit ,Input } from '@angular/core';
import {Book} from "../../../model/book";
import {ShoppingService} from "../../../services/ShoppingService/shopping.service";
import {Subject} from "rxjs/index";
import {BookService} from "../../../services/BookService/book.service";

@Component({
  selector: 'app-big-book-view',
  templateUrl: './big-book-view.component.html',
  styleUrls: ['./big-book-view.component.css']
})
export class BigBookViewComponent implements OnInit {
  public book:Book;
  constructor(private shopping:ShoppingService,private booksService:BookService) { }

  ngOnInit() {
    this.book = new Book();
    this.booksService.getChoosenBook().subscribe( res => this.book = res);
  }

  public changeBook(newBook: Book) {
    console.log(newBook);
    console.log(this.book);
    this.book = newBook;
  }

  public addToCart() {
    this.shopping.addToCart(this.book);
  }
}
