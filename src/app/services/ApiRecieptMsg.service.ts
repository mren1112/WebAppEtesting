import { Component,Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { element } from 'protractor';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class ApiRecieptMsgService {


  public us = sessionStorage.getItem("stdcode");
  public sem = sessionStorage.getItem("sem");
  public year = sessionStorage.getItem("year");
  //public tmpdatetoStr = sessionStorage.getItem("tmpdatetoStr");


  urlFetchAllCourse= "http://sevkn.ru.ac.th//etest/repMsg.jsp";



  constructor(private http: HttpClient) {
    /*console.log(this.urlFetchAllCourse);
    this.getJSON().subscribe(response => {
      console.log("response sec = " + JSON.stringify(response));
    });*/
  }
  getJSON(): Observable<any> {
    return this.http.get(this.urlFetchAllCourse)
                .pipe(map((res: any)=> res ),
                      catchError(err => {return (err)}));
  }


}

