import { Component, OnInit } from '@angular/core';
import {Book} from "../../../model/book";
import {BookService} from "../../../services/BookService/book.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public books: Book[];
  constructor(private booksService: BookService) { }

  ngOnInit() {
    this.booksService.getBookList()
      .subscribe(res => this.books = res);
  }

}
