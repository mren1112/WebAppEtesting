import { Component, OnInit } from '@angular/core';
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

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.css']

})
export class ConfirmComponent implements OnInit{

  coursetest = [
    { courseno: 'COS2101', credit: 3, status: false },
    { courseno: 'COS2102', credit: 3, status: false },
  ];


  //todotest: any  = localStorage.getItem("todo");
  public cntTodoCourse;

//-----------------------------
public todoCourse: any=[];
public tmptodoCourse: any=[];
  public tmpCourse: any=[];
  public sumCredit:number;
  public iCourse: any=[];
  public iCredit: any=[];
  public iFeelab: any=[];
  public iCourclass: any=[];
  public iSection: any=[];
  public iType: any=[];
  public iExamdate: any=[];
  public sumMoney;
  public subyear;
  public year;
  public semester;

  public todocredit:  any=[];
  public todo:  any=[];
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
  public grad = sessionStorage.getItem("neargrad");;
  public us;
  public feeTemp;
  public feeNo;
  public adddroptype;
  public sumCreditTodo;
  public sumCreditTmp;
  public isenabled: boolean = false;
  public alert='';
  public stdcodeEnc;
  public tel;
  public stdyear;
  public creditMax;
  public creditMin;
  public creditMaxEnd;
//----------------------------
  constructor(
    private httpClient: HttpClient,
    private confirmservice:ApiConfirmService,

    ){

  }

  ngOnInit(){

    this.chkTodoSelectCourse();
    this.chbkconfirm();
  }

  chkTodoSelectCourse(){
    this.us = sessionStorage.getItem("stdcode");
    this.semester = sessionStorage.getItem("sem");
    this.year = sessionStorage.getItem("year");
  this.todoCourse = JSON.parse(sessionStorage.getItem("todoSelectCourse"));
  this.cntTodoCourse = Object.keys(this.todoCourse).length;

  this.total = Number(this.cntTodoCourse) * 50;
  if (this.total != 0) {
    sessionStorage.setItem("total",this.total)
  }

    if (this.todoCourse != null && this.cntTodoCourse != 0) {
      console.log("todoConfirmSelectCourse = " + this.todoCourse);
      console.log("total course = " + this.cntTodoCourse);

     // alert("wtf1"+ this.todoConfirmSelectCourse);
    } else {
          alert("wtf2");
    }

  }

  chbkconfirm(){
     this.tmptodoCourse = this.todoCourse;
    var chksection;
    var tmpSection:any[] =[];
    for (let i = 0; i < this.tmptodoCourse .length; i++) {
      if (this.todoCourse[i].courseno != null) {
        this.httpClient.get("http://sevkn.ru.ac.th/ADManage/apinessy/etest/chkDateSection.jsp?STD_CODE=" + this.us + "&sem=" + this.semester
        + "&year=" + this.year + "&dateselect=" + this.tmptodoCourse[i].date + "&period=" + this.tmptodoCourse[i].section).subscribe(res => {
        chksection = res;

            //tmpSection[i] =chksection.result;
           // tmptodoCourse[i].push({tmpSection: chksection.result})
          // this.tmptodoCourse.filter((arr) => {
            this.tmptodoCourse[i].tmpSection = chksection.result;
        //  });

        if (this.tmptodoCourse[i].tmpSection == 0) {

        }
            console.log("tmpSection = "+JSON.stringify(this.tmptodoCourse));
      });
      }


    }
  }



  confirm(){


      var tempA =  JSON.parse(sessionStorage.getItem("todoCourse"));
      this.sumCredit = 0;

      this.confirmservice.doConfirm(
        this.us ,


        )
      .then((data:any) => {});

      this.iCourse= [];
      this.iCredit= [];
      this.iFeelab= [];
      this.iSection= [];
      this.iCourclass= [];
      this.aLabCost= [];
    }



}
