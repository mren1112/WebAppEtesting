import { Component,Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { element } from 'protractor';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class ApiFetchAllCourseRegisService {


  public us = sessionStorage.getItem("stdcode");
  public sem = sessionStorage.getItem("sem");
  public year = sessionStorage.getItem("year");

  urlFetchAllCourse= "http://sevkn.ru.ac.th/ADManage/apinessy/etest/getAllCourseRegis.jsp?STD_CODE="+this.us+"&sem="+this.sem+"&year="+this.year;



  constructor(private http: HttpClient) {console.log(this.urlFetchAllCourse);
    this.getJSON().subscribe(response => {
      console.log(response);
      console.log("response std = " + this.us);
    });
  }
  getJSON(): Observable<any> {
    return this.http.get(this.urlFetchAllCourse)
                .pipe(map((res: any)=> res ),
                      catchError(err => {return (err)}));
  }


}

