import { Component, OnInit } from '@angular/core';
import {ShoppingService} from "../../../services/ShoppingService/shopping.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private shopping:ShoppingService) { }

  ngOnInit() {
    this.shopping.getList().subscribe(res=>console.log(res));
  }

}
