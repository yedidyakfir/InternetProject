import { Component, OnInit } from '@angular/core';
import {Book} from "../../../model/book";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  public b: Book;
  booksUrl = 'http://localhost:8080/books/list';
  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log("I ahte this is idiotic");
    this.http.get(this.booksUrl)
      .subscribe(res => console.log(res));

    this.b = new Book();
    this.b.price = 15;
    this.b.name = "StormLight";
    this.b.active = true;
  }

}
