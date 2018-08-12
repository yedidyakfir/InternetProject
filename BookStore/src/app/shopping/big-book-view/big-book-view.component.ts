import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../../model/book";

@Component({
  selector: 'app-big-book-view',
  templateUrl: './big-book-view.component.html',
  styleUrls: ['./big-book-view.component.css']
})
export class BigBookViewComponent implements OnInit {
  @Input()
  public modalBook:Book = new Book();

  constructor() { }

  ngOnInit() {
    console.log(this.modalBook);
  }

  public changeBook(newBook: Book) {
    console.log(this.modalBook);
    console.log(newBook);
    this.modalBook = newBook;
    console.log(this.modalBook.photo);
  }

}
