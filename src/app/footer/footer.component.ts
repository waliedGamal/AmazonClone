import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }
  windowScrolled = false;
  ngOnInit(): void {

    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });

  }
  scrollToTop(){
    window.scrollTo(0, 0);
  }

}
