import { Component, OnInit } from '@angular/core';
import {Book} from "../../../model/book";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  public b: Book;
  public books: Book[];
  booksUrl = 'http://localhost:3000/books/list';
  constructor(private http: HttpClient) { }

  ngOnInit() {
    // console.log("I ahte this is idiotic");
    // this.http.get('http://localhost:3000/books/create')
    //   .subscribe(res => console.log('created success'));

    //I requesting the books data and store it in the array which is connected to the view
    this.http.get(this.booksUrl)
      .subscribe(res =>
      {
        console.log(res);
        this.books = res as Book[];
        console.log("before printing name");
        console.log(this.books[0].name);
      });
    //
    // this.b = new Book();
    // this.b.price = 15;
    // this.b.name = "StormLight";
    // this.b.active = true;
  }

}
