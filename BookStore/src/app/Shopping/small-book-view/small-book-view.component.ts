import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-small-book-view',
  templateUrl: './small-book-view.component.html',
  styleUrls: ['./small-book-view.component.css']
})
export class SmallBookViewComponent implements OnInit {
  @Input()
  i:number;
  constructor() { }

  ngOnInit() {
  console.log(this.i);
  }

}
