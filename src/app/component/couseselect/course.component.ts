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
  Validators,
} from '@angular/forms';
import { ApiFetchETCourseService } from 'src/app/services/ApiFetchETCourse.service';
import * as moment from 'moment';
import { ApiFetchDateSectionService } from 'src/app/services/ApiFecthDateSection.service';
import { Location } from '@angular/common';
import { ApiCheckSelectDateService } from 'src/app/services/ApiCheckSelectDate.service';

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
  public us;
  public sem;
  public year;
  public newData: newArray[] = [];

  public todoCourse: any = [];
  public todoSelectCourse: any = [];
  public todoSection: any = [];
  json_tmp: any = [];

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

  public strDate;
  public endDate;
  subStrYear;
  subStrEndYear;
  subStrMonth;
  subStrEndMonth;
  subStrDate;
  subStrEndDate;
  events: string[] = [];
  selectedDay: string[] = [];
  eventstmp = [{ date: null }];
  startDate = new Date(2020 + 543, 7, 27);
  endtDate = new Date(2020 + 543, 7, 31);
  isEnable: boolean = true;
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private apiFetchETCourse: ApiFetchETCourseService,
    private apiFetchDateSection: ApiFetchDateSectionService,
    private apiCheckSelectDate: ApiCheckSelectDateService,
    private httpClient: HttpClient,
    private _location: Location
  ) {
    //this.addCheckboxes();
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

    if (sessionStorage.getItem('stdcode') == null) {
      alert('please login again');
      this.backClicked();
    } else {
      this.us = sessionStorage.getItem('stdcode');
      this.sem = sessionStorage.getItem('sem');
      this.year = sessionStorage.getItem('year');
      this.strDate = sessionStorage.getItem('enddate');
      this.endDate = sessionStorage.getItem('startdate');
    }



    this.getEtCourse();
    this.loading();
    //this.checkConfirm();
  }

  showSpinner: boolean = false;
  loading() {
    if (
      this.todoCourse == '' ||
      this.todoCourse == null ||
      this.todoCourse == undefined
    ) {
      this.showSpinner = true;
      setTimeout(() => {
        this.showSpinner = false;
      }, 5000);
    }
  }

  backClicked() {
    // this._location.back();
    sessionStorage.clear();
    window.location.href = 'https://beta-e-service.ru.ac.th/';
  }

  checkConfirm() {
    var tempA = this.todoSelectCourse;
    console.log('checkConfirm = ' + tempA.length);
    for (let i = 0; i < tempA.length; i++) {
      if (tempA[i].section == '' ) {
        this.isEnable = true;
        console.log('ifffffff');
        // alert('if');
         break;
      } else {
        console.log('elseeeee');
        this.isEnable = false;
        // break;
        // alert('else');
      }
    }
  }

  getEtCourse() {
    this.apiFetchETCourse.getJSON().subscribe((data) => {
      this.todoCourse = data.results;
      //this.todoCourse =this.coursetest;
      this.cntCourseNo = Object.keys(data).length;
      if (sessionStorage.getItem('enddate') != '' && sessionStorage.getItem('startdate') != '' && sessionStorage.getItem('stdcode') != null) {
        this.subStrYear = Number(this.strDate.substring(6, 10)) - 543;
        this.subStrEndYear = Number(this.endDate.substring(6, 10)) - 543;
        this.subStrMonth = this.strDate.substring(0, 2);
        this.subStrEndMonth = this.endDate.substring(0, 2);
        this.subStrDate = this.strDate.substring(3, 5);
        this.subStrEndDate = this.endDate.substring(3, 5);
      } else {
        this.backClicked();
      }
    });
  }

  //paint alert day
  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const date = d.getDate();

    // Highlight the 1st and 20th day of each month.
    return date === 0 || date === 0 ? 'dateAleart-class' : '';
  };

  enableselectSect() {
    //this.sectionselect =false;
  }
  holidayList;
  //disable select holiday
  myFilter = (d: Date | null): boolean => {
  // const day = d;

  this.holidayList=[new Date(2563, 7, 29).getTime()]
  const time= d.getTime()
  //console.log("Gettime : " + time);
  return  !this.holidayList.find(x=>x==time)


    //return day !== 0  ;
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
            this.todoSelectCourse.indexOf(courseno), 1);
          console.log('pushtest =' + this.pushtest);
          sessionStorage.setItem('todoSelectCourse',
            JSON.stringify(this.todoSelectCourse));

          console.log('push null todoCourse ->>>>>>>>>>> ' + JSON.stringify(this.todoSelectCourse) );
        } else {
          this.pushtest.push(arr.courseno);
          this.todoSelectCourse.push({
            courseno: arr.courseno,
            credit: parseInt(arr.credit),
            examdate: '',
            section: '',
            sectime: '',
            tmpSection: '',
          });
          sessionStorage.setItem(
            'todoSelectCourse',
            JSON.stringify(this.todoSelectCourse)
          );
         // this.checkConfirm();
          console.log(
            'total todoCourse ->>>>>>>>>>> ' +
            JSON.stringify(this.todoSelectCourse)
          );
          console.log('pushtest =' + this.pushtest);
        }
      }
      this.checkConfirm();
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
    var tmpsec = '';
    var sectime = '';
    var tmpsec2 = 'xx/xx/xxxx';

    console.log('course= ' + obj);
    console.log('selectedSection= ' + this.selectedSection);

    for (let i = 0; i < this.selectedSection.length; i++) {
      tmpsec = this.selectedSection[i];
    }

    var tempA = this.todoSelectCourse;
    tempA.filter((arr) => {
      if (arr.courseno == obj) {
        arr.section = this.selectedSection[index];
        if (tmpsec == '1') {
          sectime = '9.30 - 12.00';
        } else if (tmpsec == '2') {
          sectime = '13.00 - 15.30'; //alert("6666");
        } else if (tmpsec == '3') {
          sectime = '16.00 - 18.30';
        } else if (tmpsec == '4') {
          sectime = '19.00 - 21.30';
        }
        arr.sectime = sectime;
      }
    });
    console.log('sectime = ' + sectime);

    sessionStorage.setItem('todoSelectCourse', JSON.stringify(tempA));
    this.checkConfirm();

    //this.todoSection = null;
    //this.todoSelectCourse.splice(0, 1);
    // console.log('tempA dd After = ' + JSON.stringify(tempA));
  }

  addData(obj: any, index: any): void {
    //  this.todoSelectCourse.splice(index,1)
    //sessionStorage.setItem("todoSelectCourse", JSON.stringify(this.todoSelectCourse));
    console.log('index = ' + index);
    var tempA = null;
    tempA = this.todoSelectCourse;
    var tmpstr = this.selectedDay;
  }

  changeEvent(obj: any, index: any) {
    var tempA = this.todoCourse;
    this.todoCourse.filter((arr) => {
      if (arr.courseno == obj.courseno) {
        //arr.secstatus = !arr.secstatus;
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

    //console.log('this.selectedDay = ' + JSON.stringify(this.selectedDay));

    this.events.push(`${event.value}`);
    console.log('this.events = ' + JSON.stringify(this.events));
    var tmpdatetoStr = moment(new Date(this.events.join())).format(
      'DD/MM/YYYY'
    );
    var tmpdatetoStr2 = moment(new Date(this.events.join())).format(
      'DDMMYYYY'
    );
    sessionStorage.setItem('tmpdatetoStr', tmpdatetoStr);

    // console.log('tmpdatetoStr = ' + tmpdatetoStr);
    var tempA = this.todoSelectCourse;
    var tmpDate = `${event.value}`;
    // var tmpstr = this.selectedDay;

    console.log('tempA if aaa = ' + JSON.stringify(tempA));

    tempA.filter((arr) => {
      if (arr.courseno == courseno) {
        arr.examdate = tmpdatetoStr;
        arr.section = '';
        this.checkConfirm();
        //arr.secstatus = !arr.secstatus;
      }
    });

    if (tmpdatetoStr != null) {

      this.getSection(tmpdatetoStr, courseno, tmpdatetoStr2, tmpDate);

    }

    this.todoSelectCourse = tempA;
    sessionStorage.setItem('todoSelectCourse', JSON.stringify(tempA));
    this.events.splice(0, 1);

  }

  msgSection = 'no data';
  msgSectionsta = false;
  statusSectSelect = false;
  cntDate;

  getSection(tmpdatetoStr, courseno, tmpdatetoStr2, tmpDate) {
    this.calculateDate(tmpDate);
    console.log('cntDate = ' + this.cntDate);

    /*if (this.cntDate < 5) {
      alert(this.cntDate);
      this.statusSectSelect = false;
    } else {
      alert('esle date = ' + this.cntDate);
      this.statusSectSelect = true;
    }*/

    //this.httpClient
    // .get('http://sevkn.ru.ac.th/ADManage/apinessy/etest/getDateSection.jsp?STD_CODE=' +
    //  this.us + '&sem=' + this.sem + '&year=' + this.year + '&dateselect=' + tmpdatetoStr + '&courseno=' + courseno + '&tmpdateselect=' + tmpdatetoStr2)

    this.apiCheckSelectDate.getJSON(this.us, this.sem, this.year, tmpdatetoStr, courseno, tmpdatetoStr2)
      .subscribe((res) => {
        this.todoSection = res;
        var seemCourseno = false;
        var inxJson_tmp = 0;

        for (let i = 0; i < this.json_tmp.length; i++) {
          if (this.json_tmp[i].courseno == this.todoSection[0].courseno) {
            seemCourseno = true;
            inxJson_tmp = i;
          }
        }

        if (seemCourseno) {
          this.json_tmp[inxJson_tmp].examdate = this.todoSection[0].examdate;
          this.json_tmp[inxJson_tmp].section = this.todoSection[0].section;
          this.json_tmp[inxJson_tmp].cntdate = this.todoSection[0].cntdate;
          console.log('tmps seemCourseno = ' + this.todoSection[0].cntdate);

        } else {
          this.json_tmp.push(this.todoSection[0]);
        }

        if (this.json_tmp.length == 0) {
          console.log('null');
          this.json_tmp.push(this.todoSection[0]);
        }

        console.log('json_tmp =' + JSON.stringify(this.json_tmp));
        this.todoSection = this.json_tmp;

        if (this.todoSection.examdate == null) {
          this.todoCourse.filter((arr) => {
            if (arr.courseno == courseno && this.cntDate > 4) {
              arr.secstatus = true;

              // alert(arr.secstatus);
              //console.log('arr.secstatus = ' + arr.secstatus);
            }else{
              this.statusSectSelect = true;
            }
          });
        }

      });

  }

  /*

  json_mock=[
    {"courseno":"THA1003",
    "examdate":"02/02/2020",
    "data":[1,4]},
            {"courseno":"PHI1003",
             "examdate":"02/02/2020",
             "data":[1,2,3,4]
            }



            ];

*/

  calculateDate(dateSent) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);
    var ttt = Math.floor(Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())
      - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) / (1000 * 60 * 60 * 24);
    this.cntDate = ttt;
    //console.log('dateSent = ' + dateSent);
    //console.log('ttt = ' + ttt);
    return ttt;

    // return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
  }
}
