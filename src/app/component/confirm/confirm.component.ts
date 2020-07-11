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

  public us;
  public sem;
  public year;
  public todoConfirmSelectCourse;
  //todotest: any  = localStorage.getItem("todo");
  public cntTodoCourse;
  public total;


  constructor(
    private httpClient: HttpClient, ){
      
  }

  ngOnInit(){

    this.chkTodoSelectCourse();
  }

  chkTodoSelectCourse(){
    this.us = sessionStorage.getItem("stdcode");
    this.sem = sessionStorage.getItem("sem");
    this.year = sessionStorage.getItem("year");
  this.todoConfirmSelectCourse = JSON.parse(sessionStorage.getItem("todoSelectCourse"));
  this.cntTodoCourse = Object.keys(this.todoConfirmSelectCourse).length;

  this.total = Number(this.cntTodoCourse) * 50;
  if (this.total != 0) {
    sessionStorage.setItem("total",this.total)
  }

    if (this.todoConfirmSelectCourse != null && this.cntTodoCourse != 0) {
      console.log("todoConfirmSelectCourse = " + this.todoConfirmSelectCourse);
      console.log("total course = " + this.cntTodoCourse);

     // alert("wtf1"+ this.todoConfirmSelectCourse);
    } else {
          alert("wtf2");
    }

  }



}
