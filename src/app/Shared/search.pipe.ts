import { Product } from './products';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], searchWord:string,filter:string): any {

    let result:any = [];
    if(!products ||searchWord == null || filter == null ){
      return '';
    }
    products.forEach((i:any)=>{
    if(i[filter].trim().toLowerCase().includes(searchWord.toLowerCase())){
      result.push(i);
    }
    })
    return result;
  }

}

