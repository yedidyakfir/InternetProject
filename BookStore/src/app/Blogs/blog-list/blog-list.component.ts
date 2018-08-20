import { Component, OnInit } from '@angular/core';
import {BlogService} from "../../../services/BlogService/blog.service";
import {Blog} from "../../../model/blog";
import {FileUploader} from "ng2-file-upload";

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  public newBlog: Blog = new Blog();
  public blogs:Blog[];
  public fileUploader: FileUploader = new FileUploader({url:'http://localhost:3000/blog/create',itemAlias:'photo'})
  constructor(private blogService:BlogService) { }

  ngOnInit() {
    this.blogService.getList()
      .subscribe(res => this.blogs = res);

    this.fileUploader.onSuccessItem = ((item, response) => {
      if(JSON.parse(response) == true){
        this.blogService.addToBlogList(this.newBlog);
        this.reset();
      }
      else {alert("couldn't upload " + JSON.parse(response));}
    });
    this.fileUploader.onBeforeUploadItem = (file) => {
      file.file.name = this.newBlog.name;
    };
    this.fileUploader.onBuildItemForm = ((fileItem, form) => {
      form.append('name',this.newBlog.name);
      form.append('description',this.newBlog.description);
      return {fileItem,form};
    });
  }

  upload() {
    console.log("in upload func");
    this.fileUploader.uploadAll();
    this.newBlog.photo = this.newBlog.name + ".jpg";
    this.newBlog.authorized = true;
  }

  sendJoinReq(blog: Blog) {
    this.blogService.sendJoinReq(blog)
      .subscribe(res => {
        if(res) {alert("request was sent");}
        else {alert("error couldn't send this request");}
      })
  }

  reset() {this.newBlog = new Blog();}
}
