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
import { ApiFetchDateService } from 'src/app/services/ApiFetchDate.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  public todoHis: any = [];
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
  public chkDupDateAndSec: boolean = false;
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
  startDate;
  endtDate;
  isEnable: boolean = true;
  registerForm: FormGroup;
  submitted = false;
  public dateCurrent = new Date();
  public arrDateToStr: any = [];
  public todoCalendar: any = [];
  public tempTodoHis: any = [];
  msgSectionsta = false;
  statusSectSelect = false;
  cntDate;
  chktodoCourse = true;
  constructor(
    private apiFetchETCourse: ApiFetchETCourseService,
    private apiFetchDateSection: ApiFetchDateSectionService,
    private apiCheckSelectDate: ApiCheckSelectDateService,
    private apiFetchDate: ApiFetchDateService,
    private httpClient: HttpClient,
    private _location: Location,
    private router: Router,
    private route: ActivatedRoute
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

    if (sessionStorage.getItem('reloadcourse') == null) {
      window.location.reload();
      sessionStorage.setItem('reloadcourse', 'Y');
    }
    // this.loading();
    this.getCalendar();
    this.onLoadPage();
    this.setCalendar();
    this.getEtCourse();
  }

  setCalendar() {
    var tmpdate = this.dateCurrent;
    var numberOfDaysToAdd = 5;
    tmpdate.setDate(tmpdate.getDate() + numberOfDaysToAdd);

    this.arrDateToStr.push(this.dateCurrent);
    var tmpDateCurrent = moment(new Date(this.arrDateToStr.join())).format(
      'DDMMYYYY'
    );
    //alert(tmpDateCurrent.substring(4))
    //alert(tmpDateCurrent.substring(0,2));
    this.startDate = new Date(
      Number(tmpDateCurrent.substring(4)),
      Number(tmpDateCurrent.substring(2, 4)) - 1,
      Number(tmpDateCurrent.substring(0, 2))
    );
    this.endtDate = new Date(2020, 7, 31);
  }

  onLoadPage() {
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
  }

  getCalendar() {
    this.apiFetchDate.getJSON().subscribe((res) => {
      this.todoCalendar = res.results;
      console.log(JSON.stringify(this.todoCalendar));
      var checkDate;
      this.todoCalendar.forEach(e => {
        if (e == null) {
          alert('จำนวนการลงทะเบียนเต็มแล้ว');
          sessionStorage.removeItem("reloadcourse");
          this.router.navigate(['/']);
        }
      });

    });
  }


  confirm() {

    sessionStorage.removeItem("reloadcourse");
    this.router.navigate(['/confirm']);
  }

  //paint alert day
  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const date = d.getDate();

    // Highlight the 1st and 20th day of each month.
    return date === 0 || date === 0 ? 'dateAleart-class' : '';
  };

  holidayList: any[] = [];
  //disable select dayList
  myFilter = (d: Date | null): boolean => {
    for (let i = 0; i < this.todoCalendar.length; i++) {
      //this.holidayList=[new Date(Number(this.todoCalendar[i].tmpYear), Number(this.todoCalendar[i].tmpMonth), Number(this.todoCalendar[i].tmpDate)).getTime()];
      this.holidayList.push(
        new Date(
          Number(this.todoCalendar[i].tmpYear),
          Number(this.todoCalendar[i].tmpMonth) - 1,
          Number(this.todoCalendar[i].tmpDate)
        ).getTime()
      );
    }

    const time = d.getTime();
    //console.log("Gettime : " + time);
    return this.holidayList.find((x) => x == time);
  };

  showSpinner: boolean = false;
  loading(todoCourse) {
   /* if (
      Object.keys(todoCourse).length == 0 ||
      todoCourse == '' ||
      todoCourse == '' ||
      todoCourse == null ||
      todoCourse == undefined ||
      Object.keys(this.todoCalendar).length == 0 ||
      this.todoCalendar == null
    ) {
      // alert('xx');
      window.location.reload();*/
      this.showSpinner = true;
      setTimeout(() => {
        this.showSpinner = false;
      }, 5000);
      //this.router.navigate(['/']);
    //}
  }

  backClicked() {
    // this._location.back();
    sessionStorage.clear();
    window.location.href = 'https://www.ru.ac.th/';
  }

  checkConfirm() {
    var tempA = this.todoSelectCourse;
    console.log('checkConfirm = ' + tempA.length);
    for (let i = 0; i < tempA.length; i++) {
      if (tempA[i].section == '') {
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

    this.tempTodoHis = JSON.parse(sessionStorage.getItem('todoHis'));
    var tmpA = this.todoSelectCourse;

    var chkExamdate: any[];
    var chkSec: any[];
    var cntSame = 0;
    var cntSame2 = 0;
    var iExamDateHis: [];
    var iSectionHis: [];
    for (let i = 0; i < tmpA.length; i++) {
      chkExamdate = tmpA[i].examdate;
      chkSec = tmpA[i].section;

      //  console.log('cntSame = ' + cntSame);
      console.log('chkExamdate = ' + chkExamdate);
      // console.log('chkSec = ' + chkSec);
      for (let j = 0; j < i; j++) {
        console.log('chkExamdate = ' + chkExamdate);
        if (chkExamdate == tmpA[j].examdate && chkSec == tmpA[j].section) {
          cntSame++;
          this.chkDupDateAndSec = true;
          this.isEnable = true;
         // alert('ท่านเลือกวันที่มีคาบสอบตรงกัน กรุณาทำการเลือกใหม่!!');break;
        } else {
           //this.chkDupDateAndSec = false;
          // this.isEnable = false;
        }
      }
      var tmpcourseno;
      this.tempTodoHis.forEach(e => {
        tmpcourseno = e.courseno;
      });
      console.log('this.tempTodoHis.courseno = ' + tmpcourseno);

      //check his data
      if (tmpcourseno != 'N') {
        for (let k = 0; k < this.tempTodoHis.length; k++) {
          if (chkExamdate == this.tempTodoHis[k].examdate && this.tempTodoHis[k].sec == chkSec) {
           //   alert('ท่านเลือกวันที่มีคาบสอบตรงกัน กรุณาทำการเลือกใหม่!!');
           cntSame2++;
            this.chkDupDateAndSec = true;
            this.isEnable = true;
          }else {
             this.chkDupDateAndSec = false;
             // this.isEnable = false;
           }
        }
      }

    }
    if (cntSame > 0 || cntSame2 > 0) {
      this.chkDupDateAndSec = true;
      this.isEnable = true;
    }else {
      this.chkDupDateAndSec = false;
      // this.isEnable = false;
    }



    /* for (let k = 0; k < this.tempTodoHis.length; k++) {
         if (chkExamdate == this.tempTodoHis[k].examdate && this.tempTodoHis[k].sec == chkSec) {
             alert('xxxx');
             this.chkDupDateAndSec =true;
             this.isEnable = true;
         }

     }*/
    //  this.chkOldRegisCourse(tempA);
  }

  getEtCourse() {
    this.apiFetchETCourse.getJSON().subscribe((data) => {
      this.todoCourse = data.results;
      var tmp;
      this.todoCourse.forEach(e => {
        tmp = e.status;
      });



      console.log('tmp------------- ' + tmp);

      if (tmp === "N") {
        alert('ท่านไม่มีวิชาที่สามารถลงทะเบียนได้');
        this.router.navigate(['/']);
      }
      // console.log('tmp------------- ' + JSON.parse(tmp));
      this.loading(this.todoCourse);

      //this.todoCourse =this.coursetest;
      console.log('todoCourse------------- ' + JSON.stringify(this.todoCourse));
      this.cntCourseNo = Object.keys(data).length;
      console.log('this.cntCourseNo = ' + this.cntCourseNo);
      if (
        sessionStorage.getItem('enddate') != '' &&
        sessionStorage.getItem('startdate') != '' &&
        sessionStorage.getItem('stdcode') != null
      ) {
        this.subStrYear = Number(this.strDate.substring(6, 10)) - 543;
        this.subStrEndYear = Number(this.endDate.substring(6, 10)) - 543;
        this.subStrMonth = this.strDate.substring(0, 2);
        this.subStrEndMonth = this.endDate.substring(0, 2);
        this.subStrDate = this.strDate.substring(3, 5);
        this.subStrEndDate = this.endDate.substring(3, 5);

        //  this.getEtHisregister();
      } else {
        this.backClicked();
      }

      if (this.todoCourse == null || this.todoCourse == '') {
        // alert('iffff ' + this.cntCourseNo);
        this.chktodoCourse = true;
      } else {
        // alert('ELSE ' + this.cntCourseNo);
        this.chktodoCourse = false;
      }
    });
  }

  getEtHisregister() {
    this.apiFetchETCourse.getHisregister().subscribe((data) => {
      this.todoHis = data.results;
      //this.todoCourse =this.coursetest;
      // console.log('todoHis------------- ' + JSON.stringify(this.todoHis));
      if (
        this.todoHis != '' ||
        (this.todoHis != null && sessionStorage.getItem('stdcode') != null)
      ) {
      } else {
        alert('no his');
      }
    });
  }

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
  selectedCourse;

  toggleVisibility(courseno, inx) {
    this.todoCourse.filter((arr) => {
      if (arr.courseno == courseno) {
        arr.status = !arr.status;
        if (arr.status === false) {
          // alert(this.pushtest.indexOf(courseno));
          this.selectedDay[inx] = '';
          this.selectedSection[inx] = '';
          arr.secstatus = false;

          for (var i = 0; i < this.todoSelectCourse.length; i++)
            if (this.todoSelectCourse[i].courseno === courseno) {
              this.todoSelectCourse.splice(i, 1);
              this.pushtest.splice(i, 1);
              break;
            }

          //  this.pushtest.splice(this.pushtest.indexOf(courseno), 1);
          //this.todoSelectCourse.splice(this.todoSelectCourse.indexOf(courseno), 1);
          console.log('pushtest =' + this.pushtest);
          sessionStorage.setItem(
            'todoSelectCourse',
            JSON.stringify(this.todoSelectCourse)
          );

          console.log(
            'splice todoCourse ->>>>>>>>>>> ' +
            JSON.stringify(this.todoSelectCourse)
          );
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
    var tmpSectionSelect: any[];
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
          sectime = '12.00 - 14.30'; //alert("6666");
        } else if (tmpsec == '3') {
          sectime = '15:00-17:30';
        } else if (tmpsec == '4') {
          sectime = '18:00-20:30';
        }
        // arr.sectime = sectime;
      }
    });
    console.log('sectime = ' + sectime);

    sessionStorage.setItem('todoSelectCourse', JSON.stringify(tempA));

    // this.chkOldRegisCourse(tempA);
    this.checkConfirm();

    //this.todoSection = null;
    //this.todoSelectCourse.splice(0, 1);
    // console.log('tempA dd After = ' + JSON.stringify(tempA));
  }

  chkOldRegisCourse(tempA) {
    // console.log('tempA check = ' + JSON.stringify(tempA));
    this.tempTodoHis = JSON.parse(sessionStorage.getItem('todoHis'));

    if (this.tempTodoHis == null) {
      sessionStorage.removeItem('todoHis');
      alert('Loade data faild please try again.');
      this.router.navigate(['/']);
    }
    console.log('tempTodoHis = ' + this.tempTodoHis);
    var iExamdate: [];
    var iExamDateHis: [];
    var iSectionHis: [];

    for (let i = 0; i < tempA.length; i++) {
      iExamdate = tempA[i].examdate;
      iSectionHis = tempA[i].section;
      for (let j = 0; j < this.tempTodoHis.length; j++) {
        // iExamDateHis = tempTodoHis[j].examdate;
        if (
          iExamdate == this.tempTodoHis[j].examdate &&
          iSectionHis == this.tempTodoHis[j].sec
        ) {
          this.chkDupDateAndSec = true;
          this.isEnable = true;
          alert('ท่านเลือกวันที่มีคาบสอบตรงกัน กรุณาทำการเลือกใหม่!!');
        } else {
          //this.chkDupDateAndSec = false;
          // this.isEnable = true;
        }
      }
    }
  }

  addData(obj: any, index: any): void {
    this.selectedSection[index] = '';
    //  this.todoSelectCourse.splice(index,1)
    //sessionStorage.setItem("todoSelectCourse", JSON.stringify(this.todoSelectCourse));
    console.log('index = ' + index);
    var tempA = null;
    tempA = this.todoSelectCourse;
    var tmpstr = this.selectedDay;
  }

  changeEvent(obj: any, index: any) {
    this.selectedSection[index] = '';
    var tempA = this.todoCourse;
    this.todoCourse.filter((arr) => {
      if (arr.courseno == obj.courseno) {
        arr.secstatus = false;
        // console.log('arr.secstatus = ' + arr.secstatus);
      }
    });
  }

  isSelectdate = false;
  addEvent(event: MatDatepickerInputEvent<Date>, index: any, courseno) {
    this.selectedSection[index] = '';
    console.clear();
    // this.todoSelectCourse.splice(index,1)
    //sessionStorage.setItem("todoSelectCourse", JSON.stringify(this.todoSelectCourse));
    console.log('todoSelectCourse before = ', this.todoSelectCourse);

    console.log('index = ' + index);
    console.log('courseno = ' + courseno);
    // console.log('this.events null = ' + JSON.stringify(this.events));

    //console.log('this.selectedDay = ' + JSON.stringify(this.selectedDay));

    this.events.push(`${event.value}`);
    //console.log('this.events = ' + JSON.stringify(this.events));
    var tmpdatetoStr = moment(new Date(this.events.join())).format(
      'DD/MM/YYYY'
    );
    var tmpdatetoStr2 = moment(new Date(this.events.join())).format('DDMMYYYY');
    sessionStorage.setItem('tmpdatetoStr', tmpdatetoStr);

    // console.log('tmpdatetoStr = ' + tmpdatetoStr);
    var tempA = this.todoSelectCourse;
    var tmpDate = `${event.value}`;
    // var tmpstr = this.selectedDay;

    //console.log('tempA if aaa = ' + JSON.stringify(tempA));

    tempA.filter((arr) => {
      if (arr.courseno == courseno) {
        arr.examdate = tmpdatetoStr;
        arr.section = '';

        this.checkConfirm();
        //arr.secstatus = !arr.secstatus;
      }
    });

    if (tmpdatetoStr != null) {
      this.getSection(tmpdatetoStr, courseno, tmpdatetoStr2, tmpDate, index);
    }

    this.todoSelectCourse = tempA;
    sessionStorage.setItem('todoSelectCourse', JSON.stringify(tempA));
    this.events.splice(0, 1);
  }

  getSection(tmpdatetoStr, courseno, tmpdatetoStr2, tmpDate, index) {
    console.log('cntDate = ' + this.cntDate);

    /* this.httpClient.get('http://sevkn.ru.ac.th/ADManage/apinessy/etest/getDateSection.jsp?STD_CODE=' +
        this.us + '&sem=' + this.sem + '&year=' + this.year + '&dateselect=' + tmpdatetoStr + '&courseno=' + courseno + '&tmpdateselect=' + tmpdatetoStr2)
        .subscribe((res) => {*/

    if (courseno != null) {
      /*this.httpClient.get('http://sevkn.ru.ac.th/ADManage/apinessy/etest/getDateSection.jsp?STD_CODE=' +
      this.us + '&sem=' + this.sem + '&year=' + this.year + '&dateselect=' + tmpdatetoStr + '&courseno=' + courseno + '&tmpdateselect=' + tmpdatetoStr2).subscribe((res) => {*/
      this.apiCheckSelectDate
        .getJSON(
          this.us,
          this.sem,
          this.year,
          tmpdatetoStr,
          courseno,
          tmpdatetoStr2
        )
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
            // console.log('tmps seemCourseno = ' + this.todoSection[0].cntdate);
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
              //    console.log('todoCourse =' + JSON.stringify(this.todoCourse));
              if (arr.courseno == courseno) {
                arr.secstatus = true;
              }
            });
          }
        });
    }
  }

  checkSystemStatus() {
    var tempA: any = [];
    //this.httpClient.get('http://sevkn.ru.ac.th/etest/chksystem.jsp').subscribe((data) => {

    tempA = JSON.parse(sessionStorage.getItem('todosys'));
    // console.log('tempA = ' + JSON.stringify(tempA));

    if (Object.keys(tempA).length === 0 || tempA == null) {
      window.location.reload();
      setTimeout(() => {
        this.showSpinner = false;
      }, 2000);
    }

    var tmp;
    setTimeout(function () {
      tmp = JSON.stringify(tempA.close);
    }, 100);

    console.log('tempA.close = ' + JSON.stringify(tempA.close));
    if (tempA.close === 'N') {
      alert('System Close!');
      // this.router.navigate(['systemcomponent']);
    }
  }

  /*json_mock=[
    {"courseno":"THA1003",
    "examdate":"02/02/2020",
    "data":[1,4]},
            {"courseno":"PHI1003",
             "examdate":"02/02/2020",
             "data":[1,2,3,4]
            }];*/

  /* calculateDate(dateSent) {
     let currentDate = new Date();
     dateSent = new Date(dateSent);
     var ttt =
       Math.floor(
         Date.UTC(
           dateSent.getFullYear(),
           dateSent.getMonth(),
           dateSent.getDate()
         ) -
           Date.UTC(
             currentDate.getFullYear() + 543,
             currentDate.getMonth(),
             currentDate.getDate()
           )
       ) /
       (1000 * 60 * 60 * 24);
     this.cntDate = ttt;
     //console.log('dateSent = ' + dateSent);
     //console.log('ttt = ' + ttt);
     return ttt;

     // return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
   }*/
}
