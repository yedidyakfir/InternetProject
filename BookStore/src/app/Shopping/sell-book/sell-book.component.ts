import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../../model/book";
import {FileUploader,FileSelectDirective} from "ng2-file-upload";

@Component({
  selector: 'app-sell-book',
  templateUrl: './sell-book.component.html',
  styleUrls: ['./sell-book.component.css']
})
export class SellBookComponent implements OnInit {
  @Input()
  private addBookCallback: Function;

  public book = new Book();
  private uploadUrl: string = 'http://localhost:3000/books/create';
  public fileUploader: FileUploader = new FileUploader({url:this.uploadUrl,itemAlias:'photo'});
  constructor() { }

  ngOnInit() {
    this.fileUploader.onSuccessItem = ((item, response) => {
      if(JSON.parse(response) == true){
        this.reset();
        this.addBookCallback(this.book);
      }
      else {alert("couldn't upload " + JSON.parse(response));}
    });
    this.fileUploader.onBeforeUploadItem = (file) => {
      file.file.name = this.book.name + this.book.ISBN.toString();
    };
    this.fileUploader.onBuildItemForm = ((fileItem, form) => {
      form.append('bookName',this.book.name);
      form.append('bookISBN',this.book.ISBN);
      form.append('bookAuthor',this.book.author);
      form.append('bookSeries',this.book.seriesName);
      form.append('bookPublishDate',this.book.publishDate);
      form.append('bookSummary',this.book.summary);
      form.append('bookPrice',this.book.price);
      return {fileItem,form};
    });
  }

  upload() {
    console.log("in upload func");
    this.fileUploader.uploadAll();
    this.book.photo = this.book.name + this.book.ISBN.toString();
  }

  reset() {this.book = new Book();}

}
