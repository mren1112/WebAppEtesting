import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiFetchQrPaymentService } from 'src/app/services/ApiFetchQrpayment.service';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiFectSelectPayQrService } from 'src/app/services/ApiFecthSelectPayQr.service';

@Component({
  selector: 'app-listqrpayment',
  templateUrl: './listqrpayment.component.html',
  styleUrls: ['./listqrpayment.component.css'],
  providers: [DatePipe]
})
export class ListQrPaymentComponent implements OnInit {

  public us;
  public currentTime = new Date();
  public todoQrdatalist: any = [];
  // public us;
  public sem;
  public year;
  public telnum;
  public refkey;
  public total;
  public duedate;
  public datetime;
  public fullrefkey;

  public urfltest = 'https://devtest.ru.ac.th/ThaiQR/eTestQR?totalAmount=1&username=6299999991&tel=0812345678&duedate=200820&yearsem=631&refnum=000001';
  public urlFecthqar;
  public todoCourse: any = [];
  public tmptodoCourse: any = [];
  public cntTodoCourse;
  public txtsem;
  public namethai;

  //get Date
  curDate = new Date();
  public arrDateToStr: any[] = [];
  constructor(private httpclient: HttpClient,
    private apiFetchQrPaylist: ApiFetchQrPaymentService,
    private router: Router,
    private activerouter: ActivatedRoute,
    private apifecthSelecPayQr: ApiFectSelectPayQrService
  ) {

  }
  ngOnInit() {
    console.log('this.currentTime = ' + this.currentTime);
    if (sessionStorage.getItem('stdcode') == null) {
      alert('please login again');
      this.backClicked();
    } else {
      this.us = sessionStorage.getItem('stdcode');
      this.getQrDatalist();
    }
  }



  backClicked() {
    // this._location.back();
    sessionStorage.clear();
    window.location.href = 'https://www.ru.ac.th/th/';
  }




  getQrDatalist() {

    var getrefkey;
    // var subrefkey;
    if (sessionStorage.getItem("refkey") != null || sessionStorage.getItem("refkey") != "" || sessionStorage.getItem("subduedate") != "") {
      //getrefkey = sessionStorage.getItem("getrefkey");
      this.refkey = sessionStorage.getItem("refkey");
      this.duedate =sessionStorage.getItem("duedate");

      this.fullrefkey = sessionStorage.getItem("fullrefkey");
      this.datetime =sessionStorage.getItem("datetime");
   //   console.log('refkey = ' + this.refkey);
    } else {
      alert("Can't load Data please reload now!");
      this.router.navigate(['listqrpayment']);
    }


    // this.todoCourse = JSON.parse(sessionStorage.getItem('todoCourse'));
    //console.log('listqrpay = ' + JSON.stringify(this.todoCourse));


    this.sem = sessionStorage.getItem("sem");
    this.year = sessionStorage.getItem("year");
    this.us = sessionStorage.getItem("stdcode");
    this.telnum = sessionStorage.getItem("tel");
    this.namethai = sessionStorage.getItem("namethai");

    //this.arrDateToStr.push(this.curDate);
    //var tmpDateCurrent = moment(new Date(this.arrDateToStr.join())).format('DDMMYY');

   // this.duedate = tmpDateCurrent;
    console.log('sem = ' + this.sem);
    console.log('year = ' + this.year);
    console.log('us = ' + this.us);
    console.log('telnum = ' + this.telnum);
    console.log('duedate = ' + this.duedate);
    console.log('datetime = ' + this.datetime);
    console.log('fullrefkey = ' + this.fullrefkey);
    console.log('refkey = ' + this.refkey);
    console.log('total = ' + this.total);

    if (this.sem == '3') {
      this.txtsem = 'ฤดูร้อน'
    } else {
      this.txtsem = this.sem;
    }


   /* if (this.telnum !== null && this.duedate !== null && this.year !== null && this.sem !== null && this.us !== null /* && this.refkey !== null) {
      var str = this.year.substring(2, 4);
      console.log('str = ' + str);
      this.urlFecthqar = 'https://devtest.ru.ac.th/ThaiQR/eTestQR?totalAmount=' + this.total + '&username=' + this.us
        + '&tel=' + this.telnum + '&duedate=' + this.duedate + '&yearsem=' + str + this.sem + '&refnum=' + this.refkey;
      console.log(this.urlFecthqar);
    } else {
      console.log('Values is null');
    }*/

    this.apifecthSelecPayQr.getJSON(this.us, this.sem, this.year, this.fullrefkey).subscribe((res) => {
      this.tmptodoCourse = res.results;
      this.todoCourse = res.results;
      this.total = this.tmptodoCourse.total;

      console.log('listqrpay = ' + JSON.stringify(this.tmptodoCourse));
      var amount;
      this.tmptodoCourse.forEach(e => {
          amount = e.total;
          sessionStorage.setItem("total",amount);
          this.total = amount;
      });
      //this.total = sessionStorage.getItem("total");

      if (this.tmptodoCourse == "") {
        console.log(' this.err = ');
        alert("Can't load Data, please reload now!");
        this.router.navigate(['qrpagelist']);
      } else {
        if (this.telnum !== null && this.duedate !== null && this.year !== null && this.sem !== null && this.us !== null  && this.refkey !== null) {
          var str = this.year.substring(2, 4);
          console.log('str = ' + str);
          this.urlFecthqar = 'https://devtest.ru.ac.th/ThaiQR/eTestQR?totalAmount=' + this.total + '&username=' + this.us
            + '&tel=' + this.telnum + '&duedate=' + this.duedate + '&datetime=' + this.datetime + '&refnum=' + this.refkey;
          console.log(this.urlFecthqar);
        } else {
          console.log('Load datas is null');
        }


      }
    });



    /*this.apiFetchQrPaylist.getJSON().subscribe((data) => {
      this.todoQrdatalist = data.results;

    });*/

  }

  cleardata(key): void {
    console.log(key);
     if (key == 1) {
      sessionStorage.removeItem("todoCourse");
      sessionStorage.removeItem("todoSelectCourse");
      sessionStorage.removeItem("Etsno");
      sessionStorage.removeItem("refkey");
      sessionStorage.removeItem("fullrefkey");
      sessionStorage.removeItem("duedate");
      sessionStorage.removeItem("datetime");
      sessionStorage.removeItem("total");
      sessionStorage.removeItem('subduedate');
      this.router.navigate(['/']);
    }
  }

  clearqrdata(key): void {
    console.log(key);
     if (key == 1) {
      sessionStorage.removeItem("todoCourse");
      sessionStorage.removeItem("todoSelectCourse");
      sessionStorage.removeItem("Etsno");
      sessionStorage.removeItem("refkey");
      sessionStorage.removeItem("fullrefkey");
      sessionStorage.removeItem("duedate");
      sessionStorage.removeItem("datetime");
      sessionStorage.removeItem("total");
      sessionStorage.removeItem('subduedate');
      this.router.navigate(['qrpagelist']);
    }
  }

}
