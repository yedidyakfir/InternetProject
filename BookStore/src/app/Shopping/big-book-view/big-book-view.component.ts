import { Component, OnInit ,Input } from '@angular/core';
import {Book} from "../../../model/book";

@Component({
  selector: 'app-big-book-view',
  templateUrl: './big-book-view.component.html',
  styleUrls: ['./big-book-view.component.css']
})
export class BigBookViewComponent implements OnInit {
  public book:Book = new Book();
  constructor() { }

  ngOnInit() {
  }

  public changeBook(newBook: Book) {
    console.log(this.book);
    this.book = newBook;
  }

}
