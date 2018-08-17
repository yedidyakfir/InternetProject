import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable, Subject} from "rxjs/index";
import {Blog} from "../../model/blog";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogUrl = "http://localhost:3000/blog";
  private socket = io('http://localhost:3000');
  private chosenBlog: Subject<Blog>;

  constructor(private http: HttpClient) {this.chosenBlog = new Subject<Blog>(); this.getList();}

  joinRoom(blog:Blog) {
    this.socket.emit('join', blog.name);
  }

  getList() {
    this.http.get<Blog[]>(this.blogUrl + '/list')
      .subscribe(res=> {
        console.log(res);
        this.chooseBlog(res[0])
      });
  }

  sendPost(msg:string,room:string) {
    console.log(msg);
    this.socket.emit("post",{msg:msg,room:room});
  }

  getMessages(): Observable<{msg:string,user:string}> {
    return new Observable<{msg:string,user:string}>(observer =>{
      this.socket.on('post', (data) => {
        observer.next(data);
      });
    });
  }

  doILike(blog:Blog) :Observable<boolean> {
    return this.http.post<boolean>(this.blogUrl + '/doILike',{room:blog.name});
  }

  likePost(blog:Blog) {
    console.log('like');
    this.socket.emit('like',{room:blog.name});
  }

  unlikePost(blog:Blog) {
    this.socket.emit('unlike',{room:blog.name});
  }

  getPostLikes() :Observable<string> {
    return new Observable<string>(observer =>{
      this.socket.on('like', (data) => {
        observer.next(data);
      });
    });
  }

  getPostUnlike() :Observable<string> {
    return new Observable<string>(observer =>{
      this.socket.on('unlike', (data) => {
        observer.next(data);
      });
    });
  }

  chooseBlog(blog:Blog) {
    this.chosenBlog.next(blog);
  }

  getChosenBlog(): Subject<Blog> {
    return this.chosenBlog;
  }
}
