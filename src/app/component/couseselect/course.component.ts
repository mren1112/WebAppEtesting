import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { element } from 'protractor';

import {
  MatCalendarCellCssClasses,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn,
} from '@angular/forms';
import { ApiFetchETCourseService } from 'src/app/services/ApiFetchETCourse.service';
import * as moment from 'moment';
import { ApiFetchDateSectionService } from 'src/app/services/ApiFecthDateSection.service';

export interface PeriodicElement {
  courseno: string;
  coursename: string;
  credit: string;
  // symbol: string;
}

export class newArray {
  index: number;
  couse: string;
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CourseComponent implements OnInit {
  coursetest = [
    { courseno: 'COS2101', credit: 3, status: false },
    { courseno: 'COS2102', credit: 3, status: false },
  ];

  sectionfix = [{ section: 1 }, { section: 2 }, { section: 3 }, { section: 4 }];
  public us = sessionStorage.getItem("stdcode");
  public sem = sessionStorage.getItem("sem");
  public year = sessionStorage.getItem("year");
  public newData: newArray[] = [];

  public todoCourse: any = [];
  public todoSelectCourse: any = [];
  public todoSection: any = [];
  selectCourseCmplt: boolean = false;
  selectCourse: boolean = true;
  isChecked = false;
  sectionselect: boolean = false;
  public dateselect: string = '';
  selectArr = [];
  tempChkCourse = [];
  tempChkCourseName = [];
  tempChkCourseDate = [];
  tempChkCourseSec = [];
  form: FormGroup;
  chkCourseData = [];
  cntCourseNo = 0;
  selectedSection = [];

  public strDate = sessionStorage.getItem('enddate');
  public endDate = sessionStorage.getItem('startdate');
  subStrYear;
  subStrEndYear;
  subStrMonth;
  subStrEndMonth;
  subStrDate;
  subStrEndDate;
  events: string[] = [];
  selectedDay: string[] = [];
  eventstmp = [{ date: null }];
  startDate = new Date(Number(this.subStrYear) + 543, 6, 1);
  endtDate = new Date(2020 + 543, 7, 1);

  constructor(
    private apiFetchETCourse: ApiFetchETCourseService,
    private apiFetchDateSection: ApiFetchDateSectionService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      tempChkCourse: new FormArray([]),
    });
    this.addCheckboxes();
  }

  subtmp: any[];
  private addCheckboxes() {
    this.coursetest.forEach((o, i) => {
      const control = new FormControl(i === null); // if first item set to true, else false
      // comst getCouseName = new FormControl(i)
      (this.form.controls.tempChkCourse as FormArray).push(control);
      // this.subtmp.push((this.form.controls.tempChkCourse as FormArray).push(control));
      // sessionStorage.setItem("todocourse" , JSON.stringify(control) );
    });
  }

  submit() {
    const selectedOrderIds = this.form.value.tempChkCourse
      .map((v, i) => (v ? this.coursetest[i].courseno : null))
      .filter((v) => v !== null);
    console.log(selectedOrderIds);
  }

  ngOnInit() {
    this.getEtCourse();
  }

  getEtCourse() {
    this.apiFetchETCourse.getJSON().subscribe((data) => {
      this.todoCourse = data.results;
      sessionStorage.setItem('todoCourse', JSON.stringify(this.todoCourse));
      this.cntCourseNo = Object.keys(data).length;

      // console.log(this.todoCourse);
      //console.log(data.year);
      // this.tempCourse.push(data);
      // sessionStorage.setItem("todoCourse", this.todoCourse);
      // console.log("cntEt = " + this.cntCourseNo);
      // console.log("sub year = " + this.subStrYear);
      // sessionStorage.setItem("sem",data.semester);

      if (
        sessionStorage.getItem('enddate') != '' &&
        sessionStorage.getItem('startdate') != ''
      ) {
        this.subStrYear = Number(this.strDate.substring(6, 10)) - 543;
        this.subStrEndYear = Number(this.endDate.substring(6, 10)) - 543;
        this.subStrMonth = this.strDate.substring(0, 2);
        this.subStrEndMonth = this.endDate.substring(0, 2);
        this.subStrDate = this.strDate.substring(3, 5);
        this.subStrEndDate = this.endDate.substring(3, 5);
      }
    });
  }

  //paint alert day
  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const date = d.getDate();

    // Highlight the 1st and 20th day of each month.
    return date === 1 || date === 15 ? 'dateAleart-class' : '';
  };

  enableselectSect() {
    //this.sectionselect =false;
  }

  //disable select holiday
  myFilter = (d: Date | null): boolean => {
    /*for (let i = 0; i < this.datemock.length; i++) {
     const element = this.datemock[i].fixdate;

     if ( d ===  true) {
       const day= (d || new Date()).getDay()
       return day !== 0 && day !== 6;
     }

   }*/
    const day = (d || new Date()).getDay();

    // Prevent Saturday and Sunday from being selected.

    return day !== 0 && day !== 6;
    // console.log("myFilter date = " + d);
  };

  //check box event
  checkValue(event: any) {
    if (event != 'B') {
      this.selectCourse = false;
      console.log(' เข้า ' + event);
    } else {
      this.selectCourse = true;
      console.log(' เข้า - ' + event);
    }

    //console.log(event);
  }

  pushtest: any = [];
  checked: boolean[] = [];

  toggleVisibility(courseno) {
    this.todoCourse.filter((arr) => {
      if (arr.courseno == courseno) {
        arr.status = !arr.status;
        if (arr.status === false) {
          this.pushtest.splice(this.pushtest.indexOf(courseno), 1);
          this.todoSelectCourse.splice(
            this.todoSelectCourse.indexOf(courseno),
            1
          );
          console.log('pushtest =' + this.pushtest);
          sessionStorage.setItem('todoSelectCourse', this.todoSelectCourse);
          console.log(
            'push null todoCourse ->>>>>>>>>>> ' +
              JSON.stringify(this.todoSelectCourse)
          );
        } else {
          this.pushtest.push(arr.courseno);
          this.todoSelectCourse.push({
            courseno: arr.courseno,
            credit: parseInt(arr.credit),
            date: '1111',
            section: '',
          });
          sessionStorage.setItem(
            'todoSelectCourse',
            JSON.stringify(this.todoSelectCourse)
          );
          console.log(
            'total todoCourse ->>>>>>>>>>> ' +
              JSON.stringify(this.todoSelectCourse)
          );
          console.log('pushtest =' + this.pushtest);
        }
      }
      /* console.log("total todoCourse ->>>>>>>>>>> "+ JSON.stringify(this.todoSelectCourse));
       sessionStorage.setItem("todoSelectCourse",this.todoSelectCourse)*/
    });
    //sessionStorage.setItem('todoSelectCourse', this.todoSelectCourse);
    console.log(this.pushtest);
  }

  dateselected = [];
  Date = new Date();
  chkdate: Date;

  ss = [];
  public onDate(event): void {
    this.ss = event;
    console.log(this.ss);
    // this.getData(this.roomsFilter.date);
  }

  selected(event: any) {
    this.selectedSection = event.target.value;
    //sessionStorage.setItem("ssss", this.selectedSection);
    console.log('sec = ' + this.selectedSection);
    alert(this.selectedSection);
  }

  //event handler for the select element's change event
  changeDropdown(obj: any, index: any) {
    console.log('yy= ' + obj);
    console.log('dd= ' + this.selectedSection);

    var tempA = this.todoSelectCourse;
    tempA.filter((arr) => {
      if (arr.courseno == obj) {
        arr.section = this.selectedSection[index];
      }
    });

    sessionStorage.setItem('todoSelectCourse', JSON.stringify(tempA));
    //this.todoSection = null;
    //this.todoSelectCourse.splice(0, 1);
    console.log('tempA dd After = ' + JSON.stringify(tempA));
  }

  addData(obj: any, index: any): void {
    //  this.todoSelectCourse.splice(index,1)
    //sessionStorage.setItem("todoSelectCourse", JSON.stringify(this.todoSelectCourse));
    console.log('index = ' + index);
    var tempA = null;
    tempA = this.todoSelectCourse;
    var tmpstr = this.selectedDay;
  }

  changeEvent(courseno) {
    var tempA = this.todoCourse;
    this.todoCourse.filter((arr) => {
      if (arr.courseno == courseno) {
        arr.secstatus = !arr.secstatus;
        console.log('arr.secstatus = ' + arr.secstatus);
      }
    });
  }

  isSelectdate = false;
  addEvent(event: MatDatepickerInputEvent<Date>, index: any, courseno) {
    console.clear();
    // this.todoSelectCourse.splice(index,1)
    //sessionStorage.setItem("todoSelectCourse", JSON.stringify(this.todoSelectCourse));
    console.log('todoSelectCourse before = ', this.todoSelectCourse);

    console.log('index = ' + index);
    console.log('courseno = ' + courseno);
    // console.log('this.events null = ' + JSON.stringify(this.events));

    console.log('this.selectedDay = ' + JSON.stringify(this.selectedDay));

    this.events.push(`${event.value}`);
    console.log('this.events = ' + JSON.stringify(this.events));
    var tmpdatetoStr = moment(new Date(this.events.join())).format(
      'DD/MM/YYYY'
    );
    sessionStorage.setItem('tmpdatetoStr', tmpdatetoStr);
    console.log('tmpdatetoStr = ' + tmpdatetoStr);
    var tempA = this.todoSelectCourse;
    var tmpstr = this.selectedDay;

    console.log('tempA if aaa = ' + JSON.stringify(tempA));

    tempA.filter((arr) => {
      if (arr.courseno == courseno) {
        arr.date = tmpdatetoStr;
        //arr.secstatus = !arr.secstatus;
      }
    });

    if (tmpdatetoStr != null) {
      this.getSection(tmpdatetoStr,courseno);

    }

    this.todoSelectCourse = tempA;
    sessionStorage.setItem('todoSelectCourse', JSON.stringify(tempA));
    this.events.splice(0, 1);

    /*console.log('this.todoSelectCourse if After = ' + JSON.stringify(this.todoSelectCourse));*/
    console.log('tempA if After = ' + JSON.stringify(tempA));

    //console.log('filltered = ' + JSON.stringify(filltered));
  }

  getSection(tmpdatetoStr,courseno) {
    this.httpClient.get("http://sevkn.ru.ac.th/ADManage/apinessy/etest/getDateSection.jsp?"+this.us+"&sem="+this.sem+"&year="+this.year+"&dateselect="+tmpdatetoStr).subscribe(res =>{
      this.todoSection = res;
      alert(JSON.stringify(res))
      alert(tmpdatetoStr)
      if (this.todoSection != null) {
        this.todoCourse.filter((arr) => {
          if (arr.courseno == courseno) {
            arr.secstatus = !arr.secstatus;
            //console.log('arr.secstatus = ' + arr.secstatus);
          }
        });
      }
    });
  }
}
