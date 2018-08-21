import { Pipe, PipeTransform } from '@angular/core';
import {Book} from "../model/book";

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: Book[], args?: Book): Book[] {
    if(args == undefined) return value;
    if(args == new Book()) return value;

    return value.filter(function(book) {
      console.log(book.name + " includes " + args.name + ":" + book.name.toLowerCase().includes(args.name.toLowerCase()));
      return book.name.toLowerCase().includes(args.name.toLowerCase());
    });
  }

}
