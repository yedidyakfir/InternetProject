import { Component, OnInit } from '@angular/core';
import {FileUploader, FileSelectDirective } from "ng2-file-upload";

@Component({
  selector: 'app-sell-book',
  templateUrl: './sell-book.component.html',
  styleUrls: ['./sell-book.component.css']
})
export class SellBookComponent implements OnInit {
  public bookName:string;
  public ISBN:number;
  public bookAuthor:string;
  public bookSeriesName:string;
  public bookPublishDate:Date;
  public bookSummary:string;
  public bookPrice:number;

  public dateType: string = "text";
  private uploadUrl: string = 'http://localhost:3000/books/create';
  public fileUploader: FileUploader = new FileUploader({url:this.uploadUrl,itemAlias: 'photo'});
  constructor() { }

  ngOnInit() {
    this.fileUploader.onSuccessItem = ((item, response) => {
      if(JSON.parse(response) == true){this.reset();}
      else {alert("couldn't upload " + JSON.parse(response));}
    });
    this.fileUploader.onBeforeUploadItem = (file) => {
      file.file.name = this.bookName + this.ISBN.toString();
    };
    this.fileUploader.onBuildItemForm = ((fileItem, form) => {
      form.append('bookName',this.bookName);
      form.append('bookISBN',this.ISBN);
      form.append('bookAuthor',this.bookAuthor);
      form.append('bookSeries',this.bookSeriesName);
      form.append('bookPublishDate',this.bookPublishDate);
      form.append('bookSummary',this.bookSummary);
      form.append('bookPrice',this.bookPrice);
      return {fileItem,form};
    });
  }

  dateFocus() {
    this.dateType = "date";
  }

  dateBlur() {
    this.dateType = "text";
  }

  uploadBook() {
    this.fileUploader.uploadAll();
  }

  reset() {
    this.bookName = "";
    this.bookAuthor = "";
    this.bookSeriesName = "";
    this.bookPublishDate = null;
    this.bookSummary = "";
    this.bookPrice = null;
    this.ISBN = null;
  }
}
