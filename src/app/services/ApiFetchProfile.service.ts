
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { element } from 'protractor';
import { map, catchError } from 'rxjs/operators';


export interface TodoProfile {
  STD_CODE: string
  NameThai: string;
  NameEng: string;
  Birth: string;
}

@Injectable()
export class ApiFetchProfileService {

  urlFetchETCourse = "http://sevkn.ru.ac.th/ADManage/apinessy/etest/getProfile.jsp?STD_CODE=6001041208";

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(response => {
      //console.log(response);
     // sessionStorage.setItem("stdcode", response.STD_CODE);
    });
  }
  getJSON(): Observable<any> {
    return this.http.get(this.urlFetchETCourse)
                .pipe(map((response: any)=> response ),
                      catchError(err => {return (err)}));
  }
}