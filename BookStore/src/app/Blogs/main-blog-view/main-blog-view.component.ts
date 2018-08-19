import { Component, OnInit } from '@angular/core';
import {BookService} from "../../../services/BookService/book.service";
import {Book} from "../../../model/book";


@Component({
  selector: 'app-main-blog-view',
  templateUrl: './main-blog-view.component.html',
  styleUrls: ['./main-blog-view.component.css']
})
export class MainBlogViewComponent implements OnInit {
  public booksAdd: Book[];
  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getBookList(Math.random() * 2 + 1, 1)
      .subscribe(res => this.booksAdd = res);
  }

}
