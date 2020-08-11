import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class ApiFetchDateService {

  public year = sessionStorage.getItem("year");
  public sem = sessionStorage.getItem("sem");

  urlFetch = "http://sevkn.ru.ac.th/etest/getOPCalendar.jsp?year="+this.year + '&sem=' + this.sem;

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      console.log(data);
    });
  }

  getJSON(): Observable<any> {
    return this.http.get(this.urlFetch)
                .pipe(map((response: any)=> response ),
                      catchError(err => {return (err)}));
  }
}

