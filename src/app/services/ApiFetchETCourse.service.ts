import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { element } from 'protractor';
import { map, catchError } from 'rxjs/operators';


export interface ETCourse {
  year: string;
  semester: string;
  courseNo: string;
  credit: number;
  statusCourse: string;
  courseFee: string;
  insertDate: string;
  insertUser: string;
  updateDate: string;
  updateUser: string;
  status: boolean;
 // imageUrl: string;
}

@Injectable()
export class ApiFetchETCourseService {

  public us = sessionStorage.getItem("stdcode");
  public sem = sessionStorage.getItem("sem");
  public year = sessionStorage.getItem("year");

  urlFetchETCourse = "http://sevkn.ru.ac.th/etest/getEtCourse.jsp?STD_CODE="+this.us+"&sem="+this.sem+"&year="+this.year;
  urlFetchHisETCourse = "http://sevkn.ru.ac.th/etest/gethisregiscourse.jsp?STD_CODE="+this.us+"&sem="+this.sem+"&year="+this.year;

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(response => {
      if (response.grad === "") {
        sessionStorage.setItem('grad', response.grad);
      } else {
        sessionStorage.setItem('grad', "");

      }
     // sessionStorage.setItem('nocourse', JSON.stringify(response.results));
      sessionStorage.setItem('todoCourse', JSON.stringify(response));
      console.log(response);
    });
  }


  getJSON(): Observable<any> {
    return this.http.get(this.urlFetchETCourse)
                .pipe(map((response: any)=> response ),
                      catchError(err => {return (err)}));
  }

  getHisregister(): Observable<any> {
    return this.http.get(this.urlFetchHisETCourse)
                .pipe(map((response: any)=> response ),
                      catchError(err => {return (err)}));
  }
}
