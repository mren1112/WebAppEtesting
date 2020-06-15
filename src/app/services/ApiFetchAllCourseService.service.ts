import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { element } from 'protractor';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ApiFetchAllCourseService {

  urlFetchAllCourse= "http://www.iregis2.ru.ac.th/mregion/show_re.jsp?STUDENTID=6299499991";

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(response => {
      console.log(response);
    });
  }
  getJSON(): Observable<any> {
    return this.http.get(this.urlFetchAllCourse)
                .pipe(map((response: any)=> response ),
                      catchError(err => {return (err)}));
  }
}

