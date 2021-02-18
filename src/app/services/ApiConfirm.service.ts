import { Injectable } from '@angular/core';
//import { Http , Headers , RequestOptions,URLSearchParams} from '@angular/common/http';
import { Http , Headers , RequestOptions,URLSearchParams} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiConfirmService {
constructor(public http: Http) { }
//npm install @angular/http@latest
//https://devtest.ru.ac.th/ThaiQR/eTestQR?totalAmount=500&username=6299999991&tel=0812345678&duedate=200320
/*doConfirm(username:string){
  const body = new HttpParams()
    .set('username', username);
    //.set(`password`, password);
  const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  console.log("save = "+JSON.stringify(body) );
  return this.http.post('http://sevkn.ru.ac.th/ADManage/apinessy/etest/test.jsp', body.toString(), { headers, observe: 'response' })
  .pipe(map((res: HttpResponse<Object>) => res.ok), catchError(err => {return (err)}));

}
}*/

doConfirm(username:string,year:string,semester:string,cntCourseNo:string,grad:string,total:string,facno:string,iExamdate:any,iSection:any,iCourse:any,iCredit:any,iDuedate:string) {
  return new Promise((resolve,reject)=>{
    var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({headers:headers, method:'POST'});
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('username', username);
      urlSearchParams.append('year', year);
      urlSearchParams.append('semester', semester);
      urlSearchParams.append('numCourse', cntCourseNo);
      urlSearchParams.append('grad', grad);
      urlSearchParams.append('total', total);
      urlSearchParams.append('facno', facno);
      urlSearchParams.append('examdate', iExamdate);
      urlSearchParams.append('section', iSection);
      urlSearchParams.append('course', iCourse);
      urlSearchParams.append('credit', iCredit);
      urlSearchParams.append('duedate', iDuedate);

    let body = urlSearchParams.toString()
   console.log("save = "+JSON.stringify(body));

   //this.http.post('http://sevkn.ru.ac.th/ADManage/apinessy/etest/saveEtest.jsp',body,options)
  this.http.post('http://sevkn.ru.ac.th/etest/saveEtest2.jsp',body,options)
    .pipe(map(res=>res.json()))
    .subscribe(data =>{
      resolve(data);
      sessionStorage.setItem("todoresults", JSON.stringify(data.results));
      console.log("data  "+ JSON.stringify(data.results) );
      console.log("refkey = "+ JSON.stringify(data.refkey) );
      console.log("sta = "+ JSON.stringify(data.sta));
      console.log("examdate = "+ JSON.stringify(data.examdate));
      sessionStorage.setItem("refkey",data.refkey);
      sessionStorage.setItem("sta",data.sta);
      sessionStorage.setItem("fullrefkey",data.fullrefkey);
      sessionStorage.setItem("save",'Y');
    },error => {
      sessionStorage.setItem("save",'N');
        reject(error);
        alert('Register Not seccess!');
    })
  })
}
}
