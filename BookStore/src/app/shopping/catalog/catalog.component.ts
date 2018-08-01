import { Component, OnInit } from '@angular/core';
import {Book} from "../../../model/book";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  public b: Book;
  constructor() { }

  ngOnInit() {
    this.b = new Book();
    this.b.price = 15;
    this.b.name = "StormLight";
    this.b.active = true;
  }

}
