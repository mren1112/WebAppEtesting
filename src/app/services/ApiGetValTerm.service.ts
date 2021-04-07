import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ApiGetTermValService {

  urlFetchCourse = "http://sevkn.ru.ac.th//etest/apietests/msgtest.jsp";

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
     // console.log(data);
    });
  }
  getJSON(): Observable<any> {
    return this.http.get(this.urlFetchCourse);
  }
}

