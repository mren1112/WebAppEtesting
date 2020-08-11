import { Component, OnInit } from '@angular/core';
import { ApiFetchAllCourseRegisService } from '../../services/ApiFetchAllCourseRegis.service';


@Component({
  selector: 'app-regisall',
  templateUrl: './regisallcourse.component.html',
  styleUrls: ['./regisallcourse.component.css']

})
export class RegisAllCourseCreateComponent implements OnInit {

  public allCourse: any = [];
  public us;
  public sem;
  public year;
  public majorname;
  public namethai;
  public facname;

  constructor(
    private apiFetchAllCourseRegis: ApiFetchAllCourseRegisService

  ) {

  }

  ngOnInit() {
    this.fecthStorage();
    this.getAllCourseRegis();
}

  fecthStorage() {
    this.us = sessionStorage.getItem("stdcode");
    this.sem = sessionStorage.getItem("sem");
    if (this.sem === '3') {
        this.sem = "summer";
    }
    this.year = sessionStorage.getItem("year");
    this.majorname = sessionStorage.getItem("majornamthai");
    this.namethai = sessionStorage.getItem("sem");
    this.facname = sessionStorage.getItem("facName");
}

  getAllCourseRegis() {
    this.apiFetchAllCourseRegis.getJSON().subscribe(res => {
      this.allCourse = res.rec;
    //  console.log("regisAll" + JSON.stringify(this.allCourse))
    })
  }

}
