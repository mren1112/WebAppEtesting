import { Component,Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { element } from 'protractor';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class ApiCheckSystemService {


  public us = sessionStorage.getItem("stdcode");
  public sem = sessionStorage.getItem("sem");
  public year = sessionStorage.getItem("year");
  //public tmpdatetoStr = sessionStorage.getItem("tmpdatetoStr");


  urlFetchAllCourse= "http://sevkn.ru.ac.th//etest/chksystem.jsp";



  constructor(private http: HttpClient) {
    //console.log(this.urlFetchAllCourse);
    this.getJSON().subscribe(response => {
    //  console.log("response sys = " +JSON.stringify(response));
     // sessionStorage.setItem("todosys", JSON.stringify(response));
     // sessionStorage.setItem("chkop",response.close)
    });
  }
  getJSON(): Observable<any> {
    return this.http.get(this.urlFetchAllCourse)
                .pipe(map((res: any)=> res ),
                      catchError(err => {return (err)}));
  }


}
