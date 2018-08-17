import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  @Input()
  public post: {msg:string, user:string};

  constructor() { }

  ngOnInit() {
  }

}
