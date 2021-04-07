import { Injectable } from '@angular/core';
//import { Http , Headers , RequestOptions,URLSearchParams} from '@angular/common/http';
import { Http , Headers , RequestOptions,URLSearchParams} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiGenerateSliptService {
constructor(public http: Http) { }

doGetSlip(username:string,year:string,semester:string,cntCourseNo:string,grad:string,total:string,facno:string,iSection:any,iCourse:any,tel:any) {
  return new Promise((resolve,reject)=>{
    var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({headers:headers, method:'POST'});
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('stdid', username);
      urlSearchParams.append('year', year);
      urlSearchParams.append('semester', semester);
      urlSearchParams.append('numCourse', cntCourseNo);
      urlSearchParams.append('grad', grad);
      urlSearchParams.append('total', total);
      urlSearchParams.append('facno', facno);
      urlSearchParams.append('section', iSection);
      urlSearchParams.append('course', iCourse);
      urlSearchParams.append('tel', tel);

    let body = urlSearchParams.toString()
   console.log("save = "+JSON.stringify(body));

   //this.http.post('http://sevkn.ru.ac.th//etest/ADManage/apinessy/etest/saveEtest.jsp',body,options)
  this.http.post('http://sevkn.ru.ac.th//etest/etestgbackend/RepSlipt',body,options)
    .pipe(map(res=>res.json()))
    .subscribe(data =>{
      resolve(data);
      console.log("data  "+ JSON.stringify(data) );
    },error => {

        reject(error);
    })
  })
}
}
