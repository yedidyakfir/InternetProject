import { Component, OnInit } from '@angular/core';
import {Book} from "../../../model/book";
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs/index";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  public b: Book;
  booksUrl = 'http://localhost:8080/books';
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(this.booksUrl)
      .map()

    this.b = new Book();
    this.b.price = 15;
    this.b.name = "StormLight";
    this.b.active = true;
  }

}
