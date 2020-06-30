import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { ApiGetTermValService } from '../../services/ApiGetValTerm.service';
import { ApiFetchCourseService } from '../../services/ApiFetchCourseService.service';
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
    { courseno: '1', coursename: 'COS2101', credit: 3, status: false },
    { courseno: '2', coursename: 'COS2102', credit: 3, status: false },
    { courseno: '3', coursename: 'COS2103', credit: 3, status: false },
    { courseno: '4', coursename: 'COS2104', credit: 3, status: false }
  ];

  sectionfix = [
    { sect: 1 },
    { sect: 2 },
    { sect: 3 }
  ]
  public todoCourse: any = [];
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

  constructor(
    private apiFetchCourseServices: ApiFetchCourseService,
    private apiGetTermVal: ApiGetTermValService,
    private apiFetchETCourse:ApiFetchETCourseService,
    private formBuilder: FormBuilder,

  ) {
    this.form = this.formBuilder.group({
      tempChkCourse: new FormArray([])
    });
    this.addCheckboxes();
  }

   subtmp : any[];
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
      .map((v, i) => (v ? this.coursetest[i].coursename : null))
      .filter(v => v !== null);
    console.log(selectedOrderIds);
  }


ngOnInit() {
  this.apiFetchETCourse.getJSON().subscribe(data => {
    this.todoCourse = data;
    //console.log(data.year);e
   // this.tempCourse.push(data);
    sessionStorage.setItem("todoCourse", this.todoCourse);
    // sessionStorage.setItem("sem",data.semester);
  }

  )
}

datemock = [
  { fixdate: 1 },
  { fixdate: 2 },
  { fixdate: 3 }

];


startDate = new Date(2020 + 543, 6, 1);
endtDate = new Date(2020 + 543, 7, 1);

//paint alert day
dateClass = (d: Date): MatCalendarCellCssClasses => {
  const date = d.getDate();

  // Highlight the 1st and 20th day of each month.
  return (date === 1 || date === 15) ? 'dateAleart-class' : '';

}

enableselectSect(){
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
  console.log("myFilter date = " + d);
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

checked: boolean[] = [];
toggleVisibility(courseno) {
  this.coursetest.filter(arr => {
    if (arr.courseno == courseno) {
      arr.status = !arr.status
    }
  }
  )
  /*if ( this.coursetest[i].courseno == this.coursetest[i].courseno  ) {

    console.log(i)
    this.coursetest[i].status = true ;

    this.checked[i]=event;
    //alert(event);
    console.log(event)
    console.log(event.source.id)
   // this.selectCourse = false;
  } else
   this.coursetest[i].status = false ;
 //   this.isChecked = e.target.checked;
    //this.selectCourse = true;*/
}



}




