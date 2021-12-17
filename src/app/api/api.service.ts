import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // getData() {
  //   let url = `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/20`;
  //   return this.http.get(url);
  // }
  // getAS(page: number): Observable<any> {
  //   return this.http
  //     .get(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`)
  // }

  getAS(page: number): Observable<any> {
    return this.http
      .get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/20`)
  }

  getPersons(person:number, page: number): Observable<any> {
    return this.http
      .get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${person}/friends/${page}/20`)
  }

  getPerson(person:number): Observable<any> {
    return this.http
      .get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${person}`)
  }
}