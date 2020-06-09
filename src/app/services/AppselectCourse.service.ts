import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export class ApiCourseService{

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
        console.log(data);
    });
}
  getJSON(): Observable<any> {
    return this.http.get("./assets/mydata.json");
}
}
