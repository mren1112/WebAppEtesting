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

  public us = sessionStorage.getItem("stdcode");
  public sem = sessionStorage.getItem("sem");
  public year = sessionStorage.getItem("year");
   todoConfirmSelectCourse = JSON.parse(sessionStorage.getItem("todoSelectCourse"));
  todotest: any  = localStorage.getItem("todo");

  form: FormGroup;
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder){
      this.form = this.formBuilder.group({
        tempChkCourse: new FormArray([]),
      });
  }

  ngOnInit(){
    this.chkTodoSelectCourse();
  }

  chkTodoSelectCourse(){

    if (this.todoConfirmSelectCourse != null) {
      console.log("todoConfirmSelectCourse = " + this.todoConfirmSelectCourse);

     // alert("wtf1"+ this.todoConfirmSelectCourse);
    } else {
          alert("wtf2");
    }

  }
}
