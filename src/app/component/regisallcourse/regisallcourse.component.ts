import { Component, OnInit } from '@angular/core';
import { ApiFetchAllCourseRegisService } from '../../services/ApiFetchAllCourseRegis.service';


@Component({
  selector: 'app-regisall',
  templateUrl: './regisallcourse.component.html',
  styleUrls: ['./regisallcourse.component.css']

})
export class RegisAllCourseCreateComponent implements OnInit {

  public allCourse: any = [];
  us = sessionStorage.getItem("stdcode");
  sem = sessionStorage.getItem("sem");
  year = sessionStorage.getItem("year");
  majorname = sessionStorage.getItem("majornamthai");
  namethai = sessionStorage.getItem("sem");
  facname = sessionStorage.getItem("facName");

  constructor(
    private apiFetchAllCourseRegis: ApiFetchAllCourseRegisService

  ) {

  }
  ngOnInit() {
    this.getAllCourseRegis();
}
  getAllCourseRegis() {
    this.apiFetchAllCourseRegis.getJSON().subscribe(res => {
      this.allCourse = res.rec;
    //  console.log("regisAll" + JSON.stringify(this.allCourse))
    })
  }

}
