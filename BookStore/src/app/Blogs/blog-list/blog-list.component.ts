import { Component, OnInit } from '@angular/core';
import {BlogService} from "../../../services/BlogService/blog.service";
import {Blog} from "../../../model/blog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  public blogs:Blog[];
  constructor(private blogService:BlogService, private router: Router) { }

  ngOnInit() {
    this.blogService.getList()
      .subscribe(res => this.blogs = res);
  }

  sendJoinReq(blog: Blog) {
    this.blogService.sendJoinReq(blog)
      .subscribe(res => {
        if(res) {alert("request was sent");}
        else {alert("error couldn't send this request");}
      })
  }

  enterBlog(blog: Blog) {
    //this.router.navigate(['/Blog']);
    //this.blogService.chooseBlog(blog);
    //this.router.navigate(['/Groups','BlogDiscussion']);
  }

}
