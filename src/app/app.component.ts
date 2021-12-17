import { Component, OnInit } from '@angular/core';
import { ApiService } from './api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private api: ApiService){}
  title = 'test';

  ngOnInit(): void {
    // this.api.getData().subscribe((data:any)=> {
    //   this.names = data.list
    //   console.log(this.names)
    // })
  }

}
