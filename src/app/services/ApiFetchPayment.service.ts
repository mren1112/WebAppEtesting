import { Component,Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { element } from 'protractor';
import { map, catchError } from 'rxjs/operators';
import { Http } from '@angular/http';


@Injectable()
export class ApiFetchPaymentService {


  public us = sessionStorage.getItem("stdcode");
  public sem = sessionStorage.getItem("sem");
  public year = sessionStorage.getItem("year");
  //public tmpdatetoStr = sessionStorage.getItem("tmpdatetoStr");


  urlFetch = "http://sevkn.ru.ac.th/etest/getQrpaylist.jsp?STD_CODE=";



  constructor(private httppp: HttpClient,private http:Http) {
    /*this.getJSON().subscribe(data => {
      //sessionStorage.setItem("stdcode", data.STD_CODE);
      sessionStorage.setItem("namethai", data.NameThai);

      //console.log(response);
     // sessionStorage.setItem("stdcode", response.STD_CODE);
   // });*/
  }


  getJSON(username:string,sem:string,year:string,refkey:string){
    return this.httppp.get('http://sevkn.ru.ac.th/etest/getPayment.jsp?STD_CODE='+username+'&sem='+sem+'&year='+year+'&refkey='+refkey)
                .pipe(map((response: any)=> response ),
                      catchError(err => {return (err)}));
  }
}