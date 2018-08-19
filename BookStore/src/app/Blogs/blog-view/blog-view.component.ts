import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Blog} from "../../../model/blog";

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {
  @Input()
  public blog:Blog;
  @Output("ClickToEnter")
  public enterBlog:EventEmitter<Blog> = new EventEmitter<Blog>();
  @Output("SendJoinReq")
  public joinReq:EventEmitter<Blog> = new EventEmitter<Blog>();
  constructor() { }

  ngOnInit() {
  }

}
