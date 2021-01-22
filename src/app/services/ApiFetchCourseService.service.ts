import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ApiFetchCourseService {

  urlFetchCourse = "http://10.2.5.243/mregion/show_re.jsp?STUDENTID=6299499991";

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      //console.log(data);
    });
  }
  getJSON(): Observable<any> {
    return this.http.get(this.urlFetchCourse);
  }
}

