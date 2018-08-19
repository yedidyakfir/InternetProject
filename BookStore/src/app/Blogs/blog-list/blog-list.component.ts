import { Component, OnInit } from '@angular/core';
import {BlogService} from "../../../services/BlogService/blog.service";
import {Blog} from "../../../model/blog";

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  public blogs:Blog[];
  constructor(private blogService:BlogService) { }

  ngOnInit() {
    this.blogService.getList()
      .subscribe(res => this.blogs = res);
  }

}
