import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

interface path{
  paht:string,
  id:number
}
@Injectable({
  providedIn: 'root'
})
export class IdReSolverService implements Resolve<path> {
  constructor(private dataSeevice :DataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<path> | Promise<path> | path   {
    return this.dataSeevice.GetProductDetails(route.params['id']);
  }
}
