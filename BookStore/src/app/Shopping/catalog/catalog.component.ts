import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../../model/book";
import {BookService} from "../../../services/BookService/book.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  @Input()
  public canMove: boolean = true; //indicate weather or not the user can switch pages to view more book

  public bookFilter: Book = new Book();

  private booksInPage: number = 9;
  private pageNumber:number = 0;

  public books:Book[] = [];
  constructor(public bookService: BookService) { }

  ngOnInit() {
    this.getBooks();
    this.bookService.getFilter()
      .subscribe(res => {
        this.bookFilter = res;
      });
  }

  public addBook(book:Book) {
    this.books.push(book);
    console.log(this.books);
  }

  public getBooks() {
    this.bookService.getBookList(this.pageNumber * this.booksInPage, this.booksInPage)
      .subscribe(bookRes => this.books = bookRes);
    console.log(this.books);
  }

  public nextPage() {
    console.log("next");
    this.pageNumber += 1;
    this.getBooks();
  }

  public previousPage() {
    if(this.pageNumber > 0)
      this.pageNumber -= 1;
    this.getBooks();
  }

}
