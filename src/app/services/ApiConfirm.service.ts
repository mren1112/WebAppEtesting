import { Injectable } from '@angular/core';
//import { Http , Headers , RequestOptions,URLSearchParams} from '@angular/common/http';
import { Http , Headers , RequestOptions,URLSearchParams} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiConfirmService {
constructor(public http: Http) { }
//npm install @angular/http@latest
//https://devtest.ru.ac.th/ThaiQR/eTestQR?totalAmount=500&username=6299999991&tel=08123456789&duedate=200320
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

doConfirm(username:string) {
  return new Promise((resolve,reject)=>{
    var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({headers:headers, method:'POST'});
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('username', username)
    let body = urlSearchParams.toString()
   console.log("save = "+JSON.stringify(body) );

    this.http.post('http://sevkn.ru.ac.th/ADManage/apinessy/etest/test.jsp',body,options)
    .pipe(map(res=>res.json()))
    .subscribe(data =>{
      resolve(data);
      //console.log("data  "+data);
    },error => {
        reject(error);
    })
  })
}
}
