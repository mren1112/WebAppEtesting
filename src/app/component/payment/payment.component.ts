import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiFectSelectPayQrService } from 'src/app/services/ApiFecthSelectPayQr.service';


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

  public urfltest = 'https://devtest.ru.ac.th/ThaiQR/eTestQR?totalAmount=1&username=6299999991&tel=0812345678&duedate=200820&yearsem=631&refnum=000001';
  public urlFecthqar;
  public todoCourse: any = [];
  public tmptodoCourse: any = [];
  public cntTodoCourse;
  public txtsem;
  public namethai;
  public duetime = '2359';
  //get Date
  curDate = new Date();
  public arrDateToStr: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute,private httpClient: HttpClient,
    private apifecthSelecPayQr: ApiFectSelectPayQrService) {

  }

  ngOnInit() {
    if (sessionStorage.getItem('stdcode') == null) {
      alert('please login again');
      this.backClicked();
    } else {
      this.chkTodoSelectCourse();
      this.fetcthUrl();
      console.log('not null qr');
    }
  }

  fetcthUrl() {

    this.sem = sessionStorage.getItem("sem");
    this.year = sessionStorage.getItem("year");
    this.us = sessionStorage.getItem("stdcode");
    this.telnum = sessionStorage.getItem("tel");
    this.total = sessionStorage.getItem("total");
    this.refkey = sessionStorage.getItem("Etsno");
    // var tmp2 = tmprefkey.split(',');
    this.namethai = sessionStorage.getItem("namethai");

    this.arrDateToStr.push(this.curDate);
    var tmpDateCurrent = moment(new Date(this.arrDateToStr.join())).format('YYMMDD');

    this.duedate = tmpDateCurrent;
    console.log('sem = ' + this.sem);
    console.log('year = ' + this.year);
    console.log('us = ' + this.us);
    console.log('telnum = ' + this.telnum);
    console.log('duedate = ' + this.duedate);
    console.log('refkey = ' + this.refkey);
    console.log('total = ' + this.total);

    if (this.sem == '3') {
      this.txtsem = 'ฤดูร้อน';
    } else {
      this.txtsem = this.sem;
    }

    if (this.telnum !== null && this.duedate !== null && this.year !== null && this.sem !== null && this.us !== null /* && this.refkey !== null*/) {
      var str = this.year.substring(2, 4);
      console.log('str = ' + str);
      this.urlFecthqar = 'https://devtest.ru.ac.th/ThaiQR/eTestQR?totalAmount=' + this.total + '&username=' + this.us
        + '&tel=' + this.telnum + '&duedate=' + this.duedate + this.duetime + '&duetime=' + this.duetime + '&yearsem=' + str + this.sem + '&refnum=' + this.refkey;
      console.log(this.urlFecthqar);
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
    window.location.href = 'https://beta-e-service.ru.ac.th/';
  }



  chkTodoSelectCourse() {

    this.todoCourse = JSON.parse(sessionStorage.getItem('todoSelectCourse'));
    this.cntTodoCourse = Object.keys(this.todoCourse).length;
    this.tmptodoCourse = JSON.parse(sessionStorage.getItem('todoSelectCourse'));
    console.log('tmptodoCourse = ' + JSON.stringify(this.tmptodoCourse));


  }

  cleardata(key): void {
    console.log(key);
     if (key == 1) {
      /*sessionStorage.removeItem("todoCourse");
      sessionStorage.removeItem("todoSelectCourse");
      sessionStorage.removeItem("Etsno");
      sessionStorage.removeItem("getrefkey");
      sessionStorage.removeItem("subrefkey");
      sessionStorage.removeItem("total");*/
      this.router.navigate(['/']);
    }

  }
}
