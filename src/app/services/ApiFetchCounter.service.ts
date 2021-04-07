
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { element } from 'protractor';
import { map, catchError } from 'rxjs/operators';


export interface TodoCounter {
  STD_CODE: string
  NameThai: string;
  NameEng: string;
  Birth: string;
}

@Injectable()
export class ApiFetchCounterService {

  urlFetchETCourse = "http://sevkn.ru.ac.th//etest/getCounter.jsp";

  constructor(private http: HttpClient) {
   /* this.getJSON().subscribe(res => {
      sessionStorage.setItem("sem", res.semester);
      sessionStorage.setItem("year", res.year);
      sessionStorage.setItem("enddate", res.enddate);
      sessionStorage.setItem("startdate", res.startdate);
      //console.log(response);
     // sessionStorage.setItem("stdcode", response.STD_CODE);
    });*/
  }
  getJSON(): Observable<any> {
    return this.http.get(this.urlFetchETCourse)
                .pipe(map((response: any)=> response ),
                      catchError(err => {return (err)}));
  }
}
