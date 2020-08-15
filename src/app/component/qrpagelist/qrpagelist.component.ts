import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiFetchQrPaymentService } from 'src/app/services/ApiFetchQrpayment.service';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiFectSelectPayQrService } from 'src/app/services/ApiFecthSelectPayQr.service';

@Component({
  selector: 'app-qrlist',
  templateUrl: './qrpagelist.component.html',
  styleUrls: ['./qrpagelist.component.css'],
  providers: [DatePipe]
})
export class QrpagelistCreateComponent implements OnInit {


  public us;
  public sem;
  public year;
  public telnum;
  public refkey;
  public total;
  public duedate;

  public urfltest = 'https://devtest.ru.ac.th/ThaiQR/eTestQR?totalAmount=1&username=6299999991&tel=0812345678&duedate=200820&yearsem=631&refnum=000001';
  public urlFecthqar;
  public todoCourse: any = [];
  public tmptodoCourse: any = [];
  public cntTodoCourse;
  public txtsem;
  public namethai;

  public currentTime = new Date();
  public todoQrdatalist: any = [];
  //get Date
  curDate = new Date();
  public arrDateToStr: any[] = [];
  public chkTodoCourse =false;
  constructor(private apiFetchQrPaylist: ApiFetchQrPaymentService,
    private router:Router,
    private activerouter:ActivatedRoute,
    private apifecthSelecPayQr: ApiFectSelectPayQrService
    ) {

  }
  ngOnInit() {
    console.log(this.currentTime);
    // this.getQrDatalist();
    if (sessionStorage.getItem('stdcode') == null) {
      alert('please login again');
      this.backClicked();
    } else {
      this.getQrDatalist();
    }


  }

  backClicked() {
    // this._location.back();
    sessionStorage.clear();
    window.location.href = 'https://beta-e-service.ru.ac.th/';
  }

  getQrDatalist() {
    this.sem = sessionStorage.getItem("sem");
    this.year = sessionStorage.getItem("year");
    this.us = sessionStorage.getItem("stdcode");
    this.telnum = sessionStorage.getItem("tel");
    //this.total = sessionStorage.getItem("total");
    //this.refkey = localStorage.getItem("Etsno");
    this.namethai = sessionStorage.getItem("namethai");

    this.arrDateToStr.push(this.curDate);
    var tmpDateCurrent = moment(new Date(this.arrDateToStr.join())).format('DDMMYY');

    this.duedate = tmpDateCurrent;
    console.log('sem = ' + this.sem);
    console.log('year = ' + this.year);
    console.log('us = ' + this.us);
    console.log('telnum = ' + this.telnum);
    console.log('duedate = ' + this.duedate);
    console.log('refkey = ' + this.refkey);
    console.log('total = ' + this.total);

    if (this.sem == '3') {
      this.txtsem = 'ฤดูร้อน'
    } else {
      this.txtsem = this.sem;
    }


    if (this.telnum !== null && this.duedate !== null && this.year !== null && this.sem !== null && this.us !== null /* && this.refkey !== null*/) {
      var str = this.year.substring(2, 4);
      console.log('str = ' + str);
      this.urlFecthqar = 'https://devtest.ru.ac.th/ThaiQR/eTestQR?totalAmount=' + this.total + '&username=' + this.us
        + '&tel=' + this.telnum + '&duedate=' + this.duedate + '&yearsem=' + str + this.sem + '&refnum=' + this.refkey;
      console.log(this.urlFecthqar);
    } else {
      console.log('Values is null');
    }


    this.apiFetchQrPaylist.getJSON().subscribe((data) => {
      this.todoQrdatalist = data.results;
      console.log('data = ' + JSON.stringify( this.todoQrdatalist));
      if (this.todoQrdatalist == "") {

        this.chkTodoCourse = true;
      }

    });

  }

  //public tmptodoCourse: any = [];
  getQrcodefromlist(refkey) {

    this.apifecthSelecPayQr.getJSON(this.us,this.sem,this.year,refkey).subscribe((res)=> {
        this.tmptodoCourse = res.results;
        localStorage.setItem('todoCoursess',this.tmptodoCourse);
        if (this.tmptodoCourse == "") {
          console.log(' this.err = ' + JSON.stringify( this.tmptodoCourse));
        } else {
          console.log(' this.tmptodoCourse = ' + JSON.stringify( this.tmptodoCourse));
          alert(' this.tmptodoCourse = ' + JSON.stringify( this.tmptodoCourse));
          localStorage.setItem('todoCoursess',this.tmptodoCourse);
          localStorage.setItem('totals',this.tmptodoCourse.total);
          localStorage.setItem('refkey',this.tmptodoCourse.refkey);
          localStorage.setItem('duedate',this.tmptodoCourse.duedate);

          console.log('total = ' + JSON.stringify(this.tmptodoCourse.total) );
           console.log('refkey = ' + this.tmptodoCourse.refkey);
          console.log('duedate = ' + this.tmptodoCourse.duedate);
        }
    });
    this.router.navigate(['listqrpayment']);
  }

  setArrStorage(refkey) {
    this.router.navigate(['payment']);
  }
}
