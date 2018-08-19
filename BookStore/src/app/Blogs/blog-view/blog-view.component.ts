import {Component, Input, OnInit} from '@angular/core';
import {Blog} from "../../../model/blog";

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {
  @Input()
  public blog:Blog;
  constructor() { }

  ngOnInit() {
  }

}
