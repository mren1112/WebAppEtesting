import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class ApiFetchDateService {

  public year = sessionStorage.getItem("year");
  public sem = sessionStorage.getItem("sem");

  urlFetch = "http://sevkn.ru.ac.th//etest/getOPCalendar.jsp?year=";

  constructor(private http: HttpClient) { }

  getJSON(): Observable<any> {
    return this.http.get(this.urlFetch+this.year + '&sem=' + this.sem)
                .pipe(map((response: any)=> response ),
                      catchError(err => {return (err)}));
  }


}

