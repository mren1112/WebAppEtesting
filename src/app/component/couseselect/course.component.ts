import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';
import { ApiFetchETCourseService } from 'src/app/services/ApiFetchETCourse.service';

export interface PeriodicElement {
  courseno: string;
  coursename: string;
  credit: string;
  // symbol: string;
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
    { courseno: 'COS2102', credit: 3, status: false }
  ];

  sectionfix = [
    { sect: 1 },
    { sect: 2 },
    { sect: 3 }
  ]
  public todoCourse: any = [];
  public todoSelectCourse: any = [];
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
  selectedSection;
  public strDate = sessionStorage.getItem("enddate");
  public endDate = sessionStorage.getItem("startdate");
  subStrYear = Number(this.strDate.substring(6, 10)) - 543;
  subStrEndYear = Number(this.endDate.substring(6, 10)) - 543;
  subStrMonth = this.strDate.substring(0, 2);
  subStrEndMonth = this.endDate.substring(0, 2);
  subStrDate = this.strDate.substring(3, 5);
  subStrEndDate = this.endDate.substring(3, 5);


  constructor(
    private apiFetchETCourse: ApiFetchETCourseService,
    // private apiFetchCounter: ApiFetchCounterService,
    private formBuilder: FormBuilder,

  ) {
    this.form = this.formBuilder.group({
      tempChkCourse: new FormArray([])
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
      .filter(v => v !== null);
    console.log(selectedOrderIds);
  }


  ngOnInit() {
    this.getEtCourse();

  }

  getEtCourse() {
    this.apiFetchETCourse.getJSON().subscribe(data => {
      this.todoCourse = data.results;
      this.cntCourseNo = Object.keys(data).length;
      //console.log(data.year);
      // this.tempCourse.push(data);
      sessionStorage.setItem("todoCourse", this.todoCourse);
      console.log("cntEt = " + this.cntCourseNo);
      console.log("sub year = " + this.subStrYear);
      // sessionStorage.setItem("sem",data.semester);
    })
  }


  startDate = new Date(Number(this.subStrYear) + 543, 6, 1);
  endtDate = new Date(2020 + 543, 7, 1);

  //paint alert day
  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const date = d.getDate();

    // Highlight the 1st and 20th day of each month.
    return (date === 1 || date === 15) ? 'dateAleart-class' : '';

  }

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
    const day = (d || new Date()).getDay()

    // Prevent Saturday and Sunday from being selected.

    return day !== 0 && day !== 6;
    // console.log("myFilter date = " + d);
  }


  //check box event
  checkValue(event: any) {
    if (event != "B") {
      this.selectCourse = false;
      console.log(" เข้า " + event);
    } else {
      this.selectCourse = true;
      console.log(" เข้า - " + event);
    }

    //console.log(event);
  }


  pushtest: any = [];
  checked: boolean[] = [];

  toggleVisibility(courseno) {
    this.todoCourse.filter(arr => {
      if (arr.courseno == courseno) {
        arr.status = !arr.status
        if (arr.status === false) {

          this.pushtest.splice(this.pushtest.indexOf(courseno), 1)
          this.todoSelectCourse.splice(this.todoSelectCourse.indexOf(courseno), 1)
          console.log("pushtest =" + this.pushtest);
          console.log("total todoCourse ->>>>>>>>>>> " + JSON.stringify(this.todoSelectCourse));
        } else {
          this.pushtest.push(arr.courseno);
          this.todoSelectCourse.push({
            "courseno": arr.courseno,
            "credit": parseInt(arr.credit),
            "date": parseInt("xxxx"),
            "section": parseInt("yyy"),

          });

          console.log("total todoCourse ->>>>>>>>>>> " + JSON.stringify(this.todoSelectCourse));
          console.log("pushtest =" + this.pushtest);
        }
      }
      /* console.log("total todoCourse ->>>>>>>>>>> "+ JSON.stringify(this.todoSelectCourse));
       sessionStorage.setItem("todoSelectCourse",this.todoSelectCourse)*/
    })
    sessionStorage.setItem("todoSelectCourse",this.todoSelectCourse);
    console.log(this.pushtest);

  }

  dateselected = [];
  x;
  dateSelect() {
    //this.dateselected.push();
    console.log("dateselected =" + this.dateselected);
  }
  value: Date = new Date();
  chkdate:Date;

  public onDate(event): void {
    this.dateselected = event;
    sessionStorage.setItem("5555",JSON.stringify(this.dateselected));
    console.log("dateselected =" + this.dateselected);
   // this.getData(this.roomsFilter.date);
  }

  selected(event: any){
    this.selectedSection = event.target.value;
    sessionStorage.setItem("ssss",this.selectedSection);
    console.log("sec = " + this.selectedSection);
    alert(this.selectedSection)
  }

}




