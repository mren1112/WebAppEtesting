import { Component, OnInit } from '@angular/core';
import { ApiFetchAllCourseService } from '../../services/ApiFetchAllCourseService.service';


@Component({
  selector: 'app-regisall',
  templateUrl: './regisallcourse.component.html',
  styleUrls: ['./regisallcourse.component.css']

})
export class RegisAllCourseCreateComponent implements OnInit{

   _dtmocrep = [
    {}
  ]
  public allCourse:  any=[];

  constructor(private apiFetchAllCourseServices:ApiFetchAllCourseService) {

  }
  ngOnInit() {
    this.apiFetchAllCourseServices.getJSON().subscribe(data => {
      this.allCourse = data.rec;

      //console.log(data.year);e
      //this.allCourse.push(data);
      sessionStorage.setItem("allcourse",JSON.stringify(this.allCourse));
     // sessionStorage.setItem("sem",data.semester);
     console.log("regisAll"+data)
    }

    )
  }

}
