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
  public duetime = "2359";
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
  public chkTodoCourse = false;
  constructor(private apiFetchQrPaylist: ApiFetchQrPaymentService,
    private router: Router,
    private activerouter: ActivatedRoute,
    private apifecthSelecPayQr: ApiFectSelectPayQrService
  ) {

  }
  ngOnInit() {
    sessionStorage.removeItem('refkey');
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
    window.location.href = 'https://www.ru.ac.th/th/';
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
    //console.log('duedate = ' + this.duedate);
    // console.log('refkey = ' + this.refkey);
    console.log('total = ' + this.total);

    if (this.sem == '3') {
      this.txtsem = 'ฤดูร้อน'
    } else {
      this.txtsem = this.sem;
    }



    this.apiFetchQrPaylist.getJSON().subscribe((data) => {
      this.todoQrdatalist = data.results;
      console.log('data = ' + JSON.stringify(this.todoQrdatalist));
      if (this.todoQrdatalist == "") {

        this.chkTodoCourse = true;
      }

    });
    if (sessionStorage.getItem('reloadqrlist') == null) {
      window.location.reload();
      sessionStorage.setItem('reloadqrlist', 'Y')
    }
  }

  //get payment page from qr list
  //public tmptodoCourse: any = [];
  getQrcodefromlist(refkey, duedate, datetime, fullrefkey) {
    //console.log('refkey = ' + refkey);
    var subrefkey;
    var subduedate;
    if (fullrefkey != '' || fullrefkey != null) {
      //subrefkey = refkey.substring(15);
      //  subduedate = refkey.substring(5,15);
      sessionStorage.setItem("subrefkey", subrefkey);
      sessionStorage.setItem("refkey", refkey);
      sessionStorage.setItem("duedate", duedate);
      sessionStorage.setItem("datetime", datetime);
      sessionStorage.setItem("fullrefkey", fullrefkey);
      //   console.log('subrefkey = ' + subrefkey);
      this.router.navigate(['listqrpayment']);
    } else {
      alert("Can't load Data please reload now!x");
      this.router.navigate(['qrpagelist']);
    }

  }
  backhome() {
    // this._location.back();
    sessionStorage.removeItem("reloadqrlist");
    this.router.navigate(['/']);
  }
  setArrStorage(refkey) {
    this.router.navigate(['payment']);
  }
  backbtn() {
    sessionStorage.removeItem("reloadqrlist");
    sessionStorage.removeItem('refkey');
    sessionStorage.removeItem('duedate');
    sessionStorage.removeItem('duedate');
    this.router.navigate(['/']);
  }

}
