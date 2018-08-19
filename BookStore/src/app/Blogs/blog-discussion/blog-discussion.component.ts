import {Component, Input, OnInit} from '@angular/core';
import {BlogService} from "../../../services/BlogService/blog.service";
import {Blog} from "../../../model/blog";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-blog-discussion',
  templateUrl: './blog-discussion.component.html',
  styleUrls: ['./blog-discussion.component.css']
})
export class BlogDiscussionComponent implements OnInit {
  public blog: Blog;
  public msg:string;
  public like: boolean;
  public isCreator: boolean;
  constructor(public blogService: BlogService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.blog = new Blog();
    this.blogService.getBlogByName(this.route.snapshot.params['name'])
      .subscribe(res => this.blogService.chooseBlog(res));
    this.blogService.getChosenBlog()
      .subscribe(nextBlog => {
        console.log(nextBlog);
        this.blog = nextBlog;
        this.blogService.joinRoom(this.blog);//join room as soon as we get the right blog
        this.blogService.doILike(this.blog) //ask did I liked this post
          .subscribe(res => {
            this.like = res;
          });
        this.blogService.isCreator(this.blog)
          .subscribe(res => this.isCreator = res);
      });
    this.blogService.getMessages()
      .subscribe(msg => this.blog.posts.push(msg));
  }

  likeToggle() {
    console.log("toggle");
    this.like = !this.like;
    if(this.like)
      this.blogService.likePost(this.blog);
    else
      this.blogService.unlikePost(this.blog);
  }
}
