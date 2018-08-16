import {Component, Input, OnInit} from '@angular/core';
import {BlogService} from "../../../services/BlogService/blog.service";
import {Blog} from "../../../model/blog";

@Component({
  selector: 'app-blog-discussion',
  templateUrl: './blog-discussion.component.html',
  styleUrls: ['./blog-discussion.component.css']
})
export class BlogDiscussionComponent implements OnInit {
  public blog: Blog;
  public msg:string;

  constructor(public blogService: BlogService) { }

  ngOnInit() {
    this.blog = new Blog();
    this.blogService.getChosenBlog()
      .subscribe(nextBlog => this.blog = nextBlog);
    this.blogService.getMessages()
      .subscribe(msg => this.blog.posts.push(msg));
  }

}
