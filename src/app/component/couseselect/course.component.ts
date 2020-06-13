import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { ApiGetTermValService } from '../../services/ApiGetValTerm.service';
import { ApiFetchCourseService } from '../../services/ApiFetchCourseService.service';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
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
  public todoCourse:  any=[];
  selectCourseCmplt: boolean = false;
  selectCourse: boolean = true;
  isChecked = false;
  sectionselect: boolean = true;
  public dateselect: string = '';
  selectArr = [];
  tempCourse = [];
  constructor(private apiFetchCourseServices: ApiFetchCourseService,
    private apiGetTermVal : ApiGetTermValService
    ) {

  }
  ngOnInit() {
    this.apiFetchCourseServices.getJSON().subscribe(data => {
      this.todoCourse = data;
      //console.log(data.year);e
      this.tempCourse.push(data);
      sessionStorage.setItem("todoCourse",this.todoCourse);
     // sessionStorage.setItem("sem",data.semester);
    }

    )
  }

  datemock = [
    { fixdate: 1 },
    { fixdate: 2 },
    { fixdate: 3 }

  ];



  //paint alert day
  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const date = d.getDate();


    // Highlight the 1st and 20th day of each month.
    return (date === 1 || date === 15) ? 'dateAleart-class' : '';
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
  }


  //check box event
  checkValue(event: any) {
    if (event != "B") {
      this.selectCourse = false;
      console.log(" เข้า " + event);
    } {
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




