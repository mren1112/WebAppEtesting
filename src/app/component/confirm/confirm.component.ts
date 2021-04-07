import { Component, OnInit,inject,Output,EventEmitter,TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { element } from 'protractor';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn,
} from '@angular/forms';
import * as moment from 'moment';
import { ApiConfirmService } from '../../services/ApiConfirm.service';
import { Http } from '@angular/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})



export class ConfirmComponent implements OnInit {
  coursetest = [
    { courseno: 'COS2101', credit: 3, status: false },
    { courseno: 'COS2102', credit: 3, status: false },
  ];
  modalRef: BsModalRef;
  message: string;
  //todotest: any  = localStorage.getItem("todo");
  public cntTodoCourse;

  public perCourse = 200;
  public chkDupDateAndSec: boolean =false;
  public chkDupButton: boolean =true;

  //-----------------------------
  public todoCourse: any = [];
  public tmptodoCourse: any = [];
  public tmpCourse: any = [];
  public sumCredit: number;
  public iCourse: any = [];
  public iCredit: any = [];
  public iFeelab: any = [];
  public iCourclass: any = [];
  public iSection: any = [];
  public cntCourseNo;
  public iExamdate: any = [];
  public sumMoney;
  public subyear;
  public year;
  public semester;
  public facno;

  public todocredit: any = [];
  public todo: any = [];
  public aCredit;
  public aCreditCost;
  public aMa;
  public aMaCost;
  public aStastd;
  public aStastdCost;
  public aNews;
  public aNewsCost;
  public aLab;
  public aLabCost;
  public aCommu;
  public aCommuCost;
  public stdstatus;
  public totalCredit;
  public fac;
  public majorno;
  public total;
  public name;
  public grad;
  public us;
  public feeTemp;
  public feeNo;
  public adddroptype;
  public sumCreditTodo;
  public sumCreditTmp;
  public isenabled: boolean = false;
  public alert = '';
  public stdcodeEnc;
  public tel;
  public stdyear;
  public creditMax;
  public creditMin;
  public creditMaxEnd;
  public sta = '';
  public expText;
  //----------------------------
 //get Date
 curDate = (new Date());
 public arrDateToStr: any[] = [];

  constructor(
    private httpClient: HttpClient,
    private confirmservice: ApiConfirmService,
    public dialog: MatDialog,
    private modalService: BsModalService,
    private router: Router, private route: ActivatedRoute,
   ) {


  }


  ngOnInit() {


    if (sessionStorage.getItem('stdcode') == null) {
      alert('please login again');
      this.backClicked();
    } else {
    this.loading();

    this.chkTodoSelectCourse();
    }

    //this.chbkconfirm();

  }

  showSpinner = false;
  loading() {
    if (this.todoCourse == "" || this.todoCourse == null  || this.todoCourse == undefined) {
     // window.location.reload();
      this.showSpinner =true;
          setTimeout(() => {
              this.showSpinner = false;
          }, 4000);
    }
  }

  backClicked() {
    // this._location.back();
    sessionStorage.clear();
    window.location.href = 'https://www.ru.ac.th/th/';
   }

  chkTodoSelectCourse() {

    if (sessionStorage.getItem('todoSelectCourse') == null) {
      alert('ทำรายการไม่สำเร็จ กรุณาทำรายการใหม่')
      this.router.navigate(['/']);

    } else {
    this.grad = sessionStorage.getItem('neargrad');
    this.us = sessionStorage.getItem('stdcode');
    this.semester = sessionStorage.getItem('sem');
    this.year = sessionStorage.getItem('year');
    this.facno = sessionStorage.getItem('facno');
    this.grad = sessionStorage.getItem('grad');
    this.todoCourse = JSON.parse(sessionStorage.getItem('todoSelectCourse'));
    this.cntTodoCourse = Object.keys(this.todoCourse).length;
    this.tmptodoCourse = JSON.parse(sessionStorage.getItem('todoSelectCourse'));

    var tmpA = this.tmptodoCourse;
    tmpA.filter((arr) => {
        if (arr.section == '1') {
          arr.sectime = '9:00 - 11:30';
        } else if (arr.section == '2') {
          arr.sectime = '12:00 - 14:30'; //alert("6666");
        } else if (arr.section == '3') {
          arr.sectime = '15:00-17:30';
        } else if (arr.section == '4') {
          arr.sectime = '18:00-20:30';
        }
        console.log('sectime = ' + arr.sectime);
               // arr.sectime = sectime;
  });
   sessionStorage.setItem('todoSelectCourse', JSON.stringify(tmpA));

    var chkExamdate : any[];
    var chkSec : any[];
    var cntSame =0;

    for (let i = 0; i < tmpA.length; i++) {
      chkExamdate = tmpA[i].examdate;
      chkSec = tmpA[i].section;
      cntSame++;
    //  console.log('cntSame = ' + cntSame);
      console.log('chkExamdate = ' + chkExamdate);
      for (let j = 0; j < i; j++) {
        console.log('chkExamdate = ' + chkExamdate);
        if (chkExamdate == tmpA[j].examdate && chkSec == tmpA[j].section) {
            this.chkDupDateAndSec = true;
            this.chkDupButton = false;
            this.isenabled = true;
            alert('ท่านเลือกวันที่มีคาบสอบตรงกัน กรุณาทำการเลือกใหม่');
        }else {
          this.chkDupDateAndSec = false;
          this.chkDupButton = true;
          this.isenabled = false;
        }
      }
    }

    console.log('tmptodoCourse = ' + JSON.stringify(this.tmptodoCourse));
    this.total = Number(this.cntTodoCourse) * this.perCourse;
    if (this.total != 0) {
      sessionStorage.setItem('total', this.total);
    }

    if (this.tmptodoCourse != null || this.tmptodoCourse != "") {
        this.checkconfirmevent();
    } else {
      alert('Please Select courses again');
      this.router.navigate(['payment']);
    }
   }

  }

  //isenabled = true;
  chekconfirm() {
   // alert('55555')
    var cntchk;
    var chksection;
    var tmpSection: any[] = [];
    var chkarrSection= [];
    for (let i = 0; i < this.tmptodoCourse.length; i++) {
      if (this.todoCourse[i].courseno != null) {
        this.httpClient.get('http://sevkn.ru.ac.th//etest/chkDateSection.jsp?STD_CODE=' + this.us + '&sem=' + this.semester +
              '&year=' + this.year + '&dateselect=' + this.tmptodoCourse[i].examdate + '&period=' +
              this.tmptodoCourse[i].section).subscribe((res) => {
            chksection = res;
            tmpSection[i] = chksection.result;
            chkarrSection.push(tmpSection[i]) ;
            console.log('chkarrSection = ' + JSON.stringify(chkarrSection));

            if (tmpSection[i] == 0) {
              this.isenabled = true;
              cntchk+1;
              this.tmptodoCourse[i].tmpSection = '!คาบสอบที่เลือกเต็ม';
            } else {
             // this.confirm();
              //this.modalRef.hide();
            }
            // tmptodoCourse[i].push({tmpSection: chksection.result})
            // this.tmptodoCourse.filter((arr) => {

            //  });

            if (this.tmptodoCourse[i].tmpSection == 0) {
            }
           // console.log('tmpSection = ' + JSON.stringify(this.tmptodoCourse));
          });
      }
    }

        this.confirm();


    this.modalRef.hide();
  }

  confirm() {
    // load data to save.
    var tempA = JSON.parse(sessionStorage.getItem('todoSelectCourse'));

    if (tempA == null) {
          this.isenabled = false;
          this.loading();
    } else {
      this.isenabled = true;
    }
    //console.log('tempA confirm = ' + JSON.stringify(tempA));
    this.sumCredit = 0;
    var x:any = [];
    this.cntCourseNo = Object.keys(tempA).length;
    for (var i = 0; i < tempA.length; i++) {
      this.sumCredit = this.sumCredit + parseInt(tempA[i].credit);
      this.iCredit.push(tempA[i].credit);
      this.iCourse.push(tempA[i].courseno);
      this.iExamdate.push(tempA[i].examdate);
      this.iSection.push(tempA[i].section);
     // x.push(tempA[i].section);
    }//console.log('this.iSection confirm = ' + JSON.stringify(x));

    this.arrDateToStr.push(this.curDate);
    var tmpDateCurrent = moment(new Date(this.arrDateToStr.join())).format('DDMMYY');

    this.sta = sessionStorage.getItem("sta");
    console.log('this.iSection confirm = ' + JSON.stringify(this.iCourse));
   // if (this.sta != "1" ) {
        this.confirmservice
        .doConfirm(
          this.us,
          this.year,
          this.semester,
          this.cntCourseNo,
          this.grad,
          this.total,
          this.facno,
          this.iExamdate,
          this.iSection,
          this.iCourse,
          this.iCredit,
          tmpDateCurrent
        )
          .then((data: any) => {});

            this.iExamdate = [];
            this.iSection = [];
            this.iCourse = [];
            this.iCredit = [];

            //this.iFeelab= [];

            this.iCourclass= [];
            //his.aLabCost= [];

   /*   } else {
        console.log("err save = ");
      }*/
    this.modalRef.hide();
    this.showSpinner =true;
          setTimeout(() => {
              this.showSpinner = false;
          }, 3000);
    this.router.navigate(['qrpagelist']);

    //this.router.navigate(['registstatus']);

  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  btnconfirm(): void {
    this.message = 'Confirmed!';
    this.chekconfirm();

  }

  btndecline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  checkconfirmevent(){

    var chksection;
    var tmpSection: any[] = [];
    for (let i = 0; i < this.tmptodoCourse.length; i++) {
      if (this.todoCourse[i].courseno != null) {
        this.httpClient.get('http://sevkn.ru.ac.th//etest/chkDateSection.jsp?STD_CODE=' + this.us + '&sem=' + this.semester +
              '&year=' + this.year + '&dateselect=' + this.tmptodoCourse[i].examdate + '&period=' +
              this.tmptodoCourse[i].section).subscribe((res) => {
            chksection = res;
            tmpSection[i] = chksection.result;
            console.log('checkbuttonconfirmevent ');

            if (tmpSection[i] == 0) {
              this.isenabled = true;
              this.tmptodoCourse[i].tmpSection = '!คาบสอบที่เลือกเต็ม';
            }
          });
      }
    }

  }

  chkOldRegisCourse(tempA: any) {
    console.log('tempA check = ' + JSON.stringify(tempA));
    var tempTodoHis = JSON.parse(sessionStorage.getItem('todoHis'));
    var iExamdate: [];
    var iExamDateHis: [];


    for (let i = 0; i < tempA.length; i++) {
      iExamdate = tempA[i].examdate;
      for (let j = 0; j < tempTodoHis.length; j++) {
        iExamDateHis = tempTodoHis[j].examdate;
        if (iExamdate == iExamDateHis) {
          this.chkDupDateAndSec = true;
         // this.isEnable = true;
          alert('ท่านเลือกวันที่มีคาบสอบตรงกัน กรุณาทำการเลือกใหม่!!');
        } else {
         // this.chkDupDateAndSec = false;
          //this.isEnable = false;
        }
      }

    }
  }
}
