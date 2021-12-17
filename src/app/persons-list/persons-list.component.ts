import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.scss'],
})
export class PersonsListComponent implements OnInit, AfterViewInit {
  @ViewChildren('theLastList', { read: ElementRef })
  theLastList: any;
  alSub: any;
  persons: any = [];
  totalPages: any;
  currentPage: number = 1;
  observer: any;

  constructor(
    private alService: ApiService
  ) {}

  ngOnInit() {
    this.getPersons();
    this.intersectionObserver();
  }

  ngAfterViewInit() {
    this.theLastList.changes.subscribe((d:any) => {
      if (d.last) this.observer.observe(d.last.nativeElement);
    });
  }

  getPersons() {
    this.alSub = this.alService.getAS(this.currentPage).subscribe((d) => {
      this.totalPages = d.pagination.total;
      d.list.forEach((element:any) => {
        this.persons.push(element);
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
          this.getPersons();
        }
      }
    }, options);
  }
}
