import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryPipe } from './category.pipe';
import { SearchPipe } from './search.pipe';
import { ShortingPipe } from './shorting.pipe';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    SearchPipe,
    CategoryPipe,
    ShortingPipe,
    LoadingSpinnerComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SearchPipe,
    CategoryPipe,
    ShortingPipe,
    LoadingSpinnerComponent,
  ],
})
export class SharedModule { }
