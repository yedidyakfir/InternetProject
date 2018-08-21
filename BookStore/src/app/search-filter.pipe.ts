import { Pipe, PipeTransform } from '@angular/core';
import {Book} from "../model/book";

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: Book[], args?: Book): Book[] {
    if(args == undefined) return value;
    if(args == new Book()) return value;
    console.log(value[0]);
    return new Array(value[0]);
  }

}
