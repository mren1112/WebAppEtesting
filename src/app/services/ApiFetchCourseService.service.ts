import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ApiFetchCourseService {

  urlFetchCourse = "http://www.iregis2.ru.ac.th/mregion/show_re.jsp?STUDENTID=6299499991";

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      console.log(data);
    });
  }
  getJSON(): Observable<any> {
    return this.http.get(this.urlFetchCourse);
  }
}

