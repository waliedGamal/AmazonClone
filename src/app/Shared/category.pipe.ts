import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './products';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(products: Product[], searchWord:string,filter:string): any {

    let result:any = [];
    if(!products ||searchWord == null || filter == null ){
      return products;
    }
    products.forEach((i:any)=>{
    if(i[filter].trim().toLowerCase().includes(searchWord.toLowerCase())){
      result.push(i);
    }
    })
    return result;
  }

  }
