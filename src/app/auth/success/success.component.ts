import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(private auth:AuthService) { }
  success:boolean
  ngOnInit(): void {
    this.success = this.auth.success.value
  }

}
