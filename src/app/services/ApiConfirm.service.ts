import { Injectable } from '@angular/core';
//import { Http , Headers , RequestOptions,URLSearchParams} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders,HttpRequest, HttpResponse,HttpParams, HttpErrorResponse  } from '@angular/common/http';


@Injectable()
export class ApiConfirmService {
constructor(public http: HttpClient) { }
doConfirm(username:string,course:any,credit:any,grad:string,year:string,semester:string,feelab:any,section:any,courclass:any,total:string,sumlab:any,feetemp:any,feeno:any,type:any){

  //console.log("doConfirm");
  //console.log(JSON.stringify(course));
  return new Promise((resolve,reject)=>{
   // let headers = new Headers({'Contene-Type':'application/x-www-form-urlencoded'});
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
   // let options = new RequestOptions({headers:headers, method:'POST'});
    let urlSearchParams = new HttpParams();
    urlSearchParams.append('username', username);
    urlSearchParams.append('course', course);
    urlSearchParams.append('credit', credit);
    urlSearchParams.append('grad', grad);
    urlSearchParams.append('year', year);
    urlSearchParams.append('semester', semester);
    urlSearchParams.append('feelab', feelab);
    urlSearchParams.append('section', section);
    urlSearchParams.append('courclass', courclass);
    urlSearchParams.append('total', total);
    urlSearchParams.append('sumlab', sumlab);
    urlSearchParams.append('feetemp', feetemp);
    urlSearchParams.append('feeno', feeno);
    urlSearchParams.append('type', type);
    let body = urlSearchParams.toString()
   console.log("save = "+body);
   // this.http.post('http://10.2.5.243/mregis/saveAdddrop.jsp',body,options)
    res=>res.json()
    .subscribe(data =>{
      resolve(data);
      console.log("data  "+data);
    },error => {
        reject(error);
    })
  })
}
}
