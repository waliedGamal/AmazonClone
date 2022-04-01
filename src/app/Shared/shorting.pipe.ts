import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorting'
})
export class ShortingPipe implements PipeTransform {

  transform(value: any, ...args: any[]) {
    if(value.length > 50){
      return value.substr(0,50)+'...'
    }else {
      return value
    }
  }

}
