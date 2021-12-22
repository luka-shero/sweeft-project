import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('theLastList', { read: ElementRef })
  theLastList: any;
  alSub: any;
  airlines: any = [];
  totalPages: any;
  currentPage: number = 1;
  observer: any;
  id:number = 0;
  person:any;
  friends:any = [];
  link:boolean = true;

  paramsSub: any;

  constructor(
    private alService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(val => {
      this.getId();
      this.airlines = []
      this.getAirlines();
      this.getPerson();
    });
    this.intersectionObserver();
  }

  linkTrue(){
    this.link = true;
  }

  linkFalse(){
    this.link = false;
  }

  getPerson(){
    this.alService.getPerson(this.id).subscribe((person) => {
      this.person = person;
      if(this.link){
        this.friends.push(person);
      }
    })
  }

  ngAfterViewInit() {
    this.theLastList.changes.subscribe((d:any) => {
      if (d.last) this.observer.observe(d.last.nativeElement);
    });
  }

  getId(){
    this.route.params.subscribe((params)=> this.id = params['id'])
  }

  getAirlines() {
    this.alSub = this.alService.getPersons(this.id, this.currentPage).subscribe((d) => {
      this.totalPages = d.pagination.total;
      d.list.forEach((element:any) => {
        let newUrl = element.imageUrl.split('/')
        newUrl[4] = Math.floor(Math.random() * 20) + 480 + "";
        newUrl = newUrl.join('/')
        element.imageUrl = newUrl;
        this.airlines.push(element);
      });
    });
  }

  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.getAirlines();
        }
      }
    }, options);
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }
}

