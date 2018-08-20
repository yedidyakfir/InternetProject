import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../../model/book";
import {BookService} from "../../../services/BookService/book.service";

@Component({
  selector: 'app-small-book-view',
  templateUrl: './small-book-view.component.html',
  styleUrls: ['./small-book-view.component.css']
})
export class SmallBookViewComponent implements OnInit {
  @Input()
  public openable: boolean = true;
  @Input()
  public book: Book;
  constructor(public booksService: BookService) { }

  ngOnInit() {
  }

}
