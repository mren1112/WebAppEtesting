import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiFectSelectPayQrService } from 'src/app/services/ApiFecthSelectPayQr.service';
import { ApiFetchPaymentService } from 'src/app/services/ApiFetchPayment.service';
import { Http } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  /* usr = '629949991';
   tel = '0123456789';
   total = '1000';*/
  public us;
  public sem;
  public year;
  public telnum;
  public refkey = '';
  public total;
  public duedate;
  public datetime;
  public urfltest = 'https://devtest.ru.ac.th/ThaiQR/eTestQR?totalAmount=1&username=6299999991&tel=0812345678&duedate=200820&yearsem=631&refnum=000001';
  public urlFecthqar;
  public todoCourse: any = [];
  public tmptodoCourse: any = [];
  public dataregister: any = [];
  public cntTodoCourse;
  public txtsem;
  public namethai;
  public expText;
  public duetime = '2359';
  public fullrefkey;
  //get Date
  curDate = new Date();
  public arrDateToStr: any[] = [];
  public testregis;

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient,
    private apifecthSelecPayQr: ApiFectSelectPayQrService,
    private apiFetchPayment: ApiFetchPaymentService,
    private http: Http
  ) {

  }

  ngOnInit() {
    if (sessionStorage.getItem('stdcode') == null) {
      alert('please login again');
      this.backClicked();
    } else {
      if (sessionStorage.getItem('reloadpayment') == null) {
        location.reload();
        sessionStorage.setItem('reloadpayment', 'Y');
      }
      this.chkTodoSelectCourse();
      console.log('not null qr');
    }
  }

  showSpinner = false;
  loading() {
    // alert('xx');

    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 3000);

  }



  fetcthUrl() {//location.reload();




    // sessionStorage.getItem('reload');
    if (sessionStorage.getItem('reloadpayment') == null) {
      // window.location.reload();
      sessionStorage.setItem('reloadpayment', 'Y');
    }

    this.fullrefkey = sessionStorage.getItem("fullrefkey");
    if (Object.keys(this.fullrefkey).length === 0) {
      location.reload();
    }
    this.sem = sessionStorage.getItem("sem");
    this.year = sessionStorage.getItem("year");
    this.us = sessionStorage.getItem("stdcode");
    this.refkey = sessionStorage.getItem("refkey");
    this.telnum = sessionStorage.getItem("tel");
    this.total = sessionStorage.getItem("total");
    this.namethai = sessionStorage.getItem("namethai");

    this.arrDateToStr.push(this.curDate);
    var tmpDateCurrent = moment(new Date(this.arrDateToStr.join())).format('YYMMDD');
    //var timmtmp  = moment(new Date(this.arrDateToStr.join())).format('Y');

    this.duedate = tmpDateCurrent;
    console.log('sem = ' + this.sem);
    console.log('year = ' + this.year);
    console.log('us = ' + this.us);
    console.log('telnum = ' + this.telnum);
    console.log('duedate = ' + this.duedate);
    console.log('total = ' + this.total);
    console.log('refkey = ' + this.refkey);
    console.log('fullrefkey = ' + this.fullrefkey);

    if (this.sem == '3') {
      this.txtsem = 'ฤดูร้อน';
    } else {
      this.txtsem = this.sem;
    }
    this.httpClient.get('http://sevkn.ru.ac.th/etest/getPayment.jsp?STD_CODE='+this.us+'&sem='+this.sem+'&year='+this.year+'&refkey='+this.fullrefkey).subscribe((res)=> {
        this.testregis =res;
       // alert("dataregister", this.testregis);
      });

    if (this.fullrefkey != null) {


      //   this.http.get('http://sevkn.ru.ac.th/etest/getPayment.jsp?STD_CODE='+this.us+'&sem='+this.sem+'&year='+this.year+'&refkey='+this.fullrefkey).subscribe((res) => {
      this.apiFetchPayment.getJSON(this.us, this.sem, this.year, this.fullrefkey).subscribe((res) => {
        this.dataregister = res;
        // this.total = this.tmptodoCourse.total;
        // sessionStorage.setItem("dataregister", this.dataregister);
        if (this.dataregister == null || Object.keys(this.dataregister).length == 0) {
          this.loading();
        }

        console.log('temA = ' + JSON.stringify(this.dataregister));

        this.dataregister.forEach(e => {
          this.expText = e.expDate;
        });
      });
    }


    if (this.telnum !== null && this.duedate !== null && this.year !== null && this.sem !== null && this.us !== null /* && this.refkey !== null*/) {
      var str = this.year.substring(2, 4);
      console.log('str = ' + str);
      this.urlFecthqar = 'https://devtest.ru.ac.th/ThaiQR/eTestQR?totalAmount=' + this.total + '&username=' + this.us
        + '&tel=' + this.telnum + '&duedate=' + this.duedate + '&datetime=' + tmpDateCurrent + this.duetime + '&refnum=' + this.refkey;
      //console.log(this.urlFecthqar);
    } else {
      console.log('Values is null');
    }


    /* this.httpClient.get('http://sevkn.ru.ac.th/ADManage/apinessy/etest/getDateSection.jsp?STD_CODE=' +
       this.us + '&sem=' + this.sem + '&year=' + this.year + '&dateselect=' + tmpdatetoStr + '&courseno=' + courseno + '&tmpdateselect=' + tmpdatetoStr2)
       .subscribe((res) => {
       });*/
  }

  backClicked() {
    // this._location.back();
    sessionStorage.clear();
    window.location.href = 'https://www.ru.ac.th/th/';
  }



  chkTodoSelectCourse() {


    this.todoCourse = JSON.parse(sessionStorage.getItem('todoSelectCourse'));
    this.cntTodoCourse = Object.keys(this.todoCourse).length;
    this.tmptodoCourse = JSON.parse(sessionStorage.getItem('todoSelectCourse'));
    console.log('tmptodoCourse = ' + JSON.stringify(this.tmptodoCourse));
    if (sessionStorage.getItem('todoSelectCourse') != null) {
      //alert('zxxxxxxxxxxxxx' + JSON.stringify(this.tmptodoCourse));
      this.fetcthUrl();

    }

  }

  cleardata(key): void {
    console.log(key);
    if (key == 1) {
      sessionStorage.removeItem("refkey");
      sessionStorage.removeItem("dataregister");
      sessionStorage.removeItem("reloadpayment");
      sessionStorage.removeItem("todoCourse");
      sessionStorage.removeItem("todoSelectCourse");
      sessionStorage.removeItem("Etsno");
      sessionStorage.removeItem("getrefkey");
      sessionStorage.removeItem("subrefkey");
      sessionStorage.removeItem("total");
      sessionStorage.removeItem("todoHis");
      sessionStorage.removeItem("fullrefkey");
      sessionStorage.removeItem("tmpdatetoStr");
      this.router.navigate(['/']);
    }

  }
}
