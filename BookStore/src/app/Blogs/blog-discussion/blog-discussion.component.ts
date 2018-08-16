import { Component, OnInit } from '@angular/core';
import {BlogService} from "../../../services/BlogService/blog.service";

@Component({
  selector: 'app-blog-discussion',
  templateUrl: './blog-discussion.component.html',
  styleUrls: ['./blog-discussion.component.css']
})
export class BlogDiscussionComponent implements OnInit {
  public msg:string;
  public posts:string[] = [];

  constructor(public blogService: BlogService) { }

  ngOnInit() {
    this.blogService.getMessages()
      .subscribe( msg => this.posts.push(msg));
  }

}
