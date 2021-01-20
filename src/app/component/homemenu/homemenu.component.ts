import { Component, Injectable, OnInit } from "@angular/core";
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterEvent, ActivatedRoute, ParamMap } from "@angular/router";
import { ApiFetchProfileService, TodoProfile } from 'src/app/services/ApiFetchProfile.service';
import { stringify } from 'querystring';
import { ApiFetchCounterService } from 'src/app/services/ApiFetchCounter.service';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ApiFetchETCourseService } from 'src/app/services/ApiFetchETCourse.service';
import { ApiFetchDateService } from 'src/app/services/ApiFetchDate.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';



@Component({
  selector: 'app-menu',
  templateUrl: './homemenu.component.html',
  styleUrls: ['./homemenu.component.css']
})

export class HomeMenuCreateComponent implements OnInit {
  public stdcode;
  todoProfile: any = [];
  todoCounter: any[];
  public us;
  //todos:TodoProfile[] = [];
  public chkcoursefull: boolean = false;
  public chkStatus: boolean = false;
  public todoHis: any = [];
  //-----------spinner----------------------

  showLoading = true;
  //----------------------------------------
  public id;
  public todoCalendar: any = [];

  constructor(
    private apiFetchProfile: ApiFetchProfileService,
    private apiGetCounter: ApiFetchCounterService,
    private httpClient: HttpClient,
    private apiFetchETCourse: ApiFetchETCourseService,
    private _router: Router,
    private route: ActivatedRoute, private apiFetchDate: ApiFetchDateService,
  ) {
    /*9 this._router.events.subscribe((routerEvent: Event) => {
       if (routerEvent instanceof NavigationStart) {
         this.showLoading = true;
       }

       if (routerEvent instanceof NavigationStart) {
         this.showLoading = false;
       }

     });*/


  }


  ngOnInit() {
    // this.id = this.route.snapshot.params.id;
    //this.id = this.route.snapshot.paramMap.get('id');
    //console.log("id = "+this.id);
    /* this.route.paramMap.subscribe(params => {
       this.id = params.get('id');
       console.log("idddd = "+this.id);
       });
       if (this.id === null ) {

         alert("null");
       }else{
         this.getProfile();
         alert("not null");

       this.loading();
     }*/
    if (sessionStorage.getItem('stdcode') == null) {
      alert('please login again');
      this.backClicked();
    }
    //

    if (localStorage.getItem('checkhome') == null) {
      localStorage.setItem('checkhome', 'Y')
      location.reload();
    }

    this.loading();

    this.getProfile();
    this.getCounter();
    sessionStorage.removeItem("subrefkey");
  }

  backClicked() {
    // this._location.back();
    sessionStorage.clear();
    //window.open('https://www.ru.ac.th/th/');
    window.location.href = 'https://www.ru.ac.th';
  }

  showSpinner = false;
  loading() {
    sessionStorage.removeItem("reloadcourse");
    if (sessionStorage.getItem("stdcode") == "" || sessionStorage.getItem("stdcode") == null || sessionStorage.getItem("stdcode") == undefined) {
      sessionStorage.clear();
      window.open('https://www.ru.ac.th');
      //window.location.href = 'https://www.ru.ac.th/th/';
    } else {
      // var tmpname =
      if (sessionStorage.getItem("namethai") == "" || sessionStorage.getItem("namethai") == null) {
        // location.reload();
        this.showSpinner = true;
        setTimeout(() => {
          this.showSpinner = false;
        }, 3000);
      } else {

        this.showSpinner = true;
        setTimeout(() => {
          this.showSpinner = false;
        }, 2000);

        var tempA = JSON.parse(sessionStorage.getItem("todosys"));
        if (tempA.close === 'N') {
          this.chkStatus = false;
          // this.router.navigate(['systemcomponent']);
        } else {
          this.chkStatus = true;
        }

      }



    }
  }



  mySubscription: any;
  getProfile() {

    if (sessionStorage.getItem("stdcode") != "") {
      this.id = sessionStorage.getItem("stdcode");
      this.getEtHisregister();
    } else {
      this._router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.mySubscription = this._router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Trick the Router into believing it's last link wasn't previously loaded
          this._router.navigated = false;
        }
      });
      this.loading();
    }
    console.log("id = " + this.id);

    /*this.apiFetchProfile.getJSON().subscribe(data => {
      this.todoProfile = data;
      console.log("todoProfile " + JSON.stringify(data));
      console.log("stdcode " + JSON.stringify(data.STD_CODE));
      /*sessionStorage.setItem("stdcode", data.STD_CODE);
       sessionStorage.setItem("namethai", data.NameThai);
       sessionStorage.setItem("facno", data.FacNo);
       sessionStorage.setItem("majorno", data.MajorNo);
       sessionStorage.setItem("majornamthai", data.MajorNameThai);
       sessionStorage.setItem("facName", data.FacNameThai);
       sessionStorage.setItem("birth", data.Birth);
      //this.us = JSON.stringify(data.STD_CODE);
    });*/

    this.apiFetchProfile.getJSON(this.id)
      .subscribe((data) => {
        this.todoProfile = data;
        console.log('this.todoProfile' + Object.keys(this.todoProfile).length)
        if (Object.keys(this.todoProfile).length === 0) {
          location.reload();
          alert('Loading data faild please login again.');
          this.logout();
        } else {
          console.log("todoProfile " + JSON.stringify(data));
          console.log("stdcode " + JSON.stringify(this.todoProfile.STD_CODE));
          // sessionStorage.setItem("stdcode", data.STD_CODE);
          sessionStorage.setItem("namethai", this.todoProfile.NameThai);
          sessionStorage.setItem("facno", this.todoProfile.FacNo);
          sessionStorage.setItem("majorno", this.todoProfile.MajorNo);
          sessionStorage.setItem("majornamthai", this.todoProfile.MajorNameThai);
          sessionStorage.setItem("facName", this.todoProfile.FacNameThai);
          sessionStorage.setItem("birth", this.todoProfile.Birth);

          if (this.todoProfile.tel == "" || this.todoProfile.tel == null) {
            alert('ท่านยังไม่ได้ระบุหมายเลขโทรศัพท์ กรุณาเพิ่มหมายเลขโทรศัพท์ที่สามารถติดต่อได้ที่ระบบ e-service. ก่อนทำการลงทะเบียน');
            //  this.logout();

          } else {
            sessionStorage.setItem("tel", this.todoProfile.tel);
          }
        }

      });

  }

  logout() {
    sessionStorage.removeItem("stdcode");
    sessionStorage.clear();
    window.location.href = 'https://www.ru.ac.th';
  }


  getCounter() {
    this.apiGetCounter.getJSON().subscribe(res => {
      this.todoCounter = res;
      sessionStorage.setItem("sem", res.semester);
      sessionStorage.setItem("year", res.year);
      sessionStorage.setItem("enddate", res.enddate);
      sessionStorage.setItem("startdate", res.startdate);
      console.log("todoCounter" + JSON.stringify(res))
    }

    )

  }



  checkSystemStatus() {
    var tempA: any = [];
    //this.httpClient.get('http://sevkn.ru.ac.th/etest/chksystem.jsp').subscribe((data) => {

    tempA = JSON.parse(sessionStorage.getItem("todosys"));
    // console.log('tempA = ' + JSON.stringify(tempA));
    var temp = btoa(tempA);
    //console.log('btoa = ' +  temp);
    //console.log('atob = ' + JSON.stringify(atob( temp)) );
    // console.log('W29iamVjdCBPYmplY3Rd = ' +  atob( 'W29iamVjdCBPYmplY3Rd'));


    if (Object.keys(tempA).length === 0 || tempA == null) {
      window.location.reload();
      setTimeout(() => {
        this.showSpinner = false;
      }, 5000);
    }

    var tmp;
    setTimeout(function () { tmp = JSON.stringify(tempA.close) }, 100);

    // console.log('tempA.close = ' + JSON.stringify(tempA.close));
    this.getCalendar();
    if (tempA.close === 'N') {
      alert('ไม่อยู่ในช่วงการลงทะเบียน!');
      // this.router.navigate(['systemcomponent']);
    } else {
      this._router.navigate(['course']);
      // this.getCalendar();
    }

  }

  getEtHisregister() {
    this.apiFetchETCourse.getHisregister().subscribe((data) => {
      this.todoHis = data.results;
      var temp = JSON.stringify(this.todoHis);
      var checkResults;
      //this.todoCourse =this.coursetest;

      this.todoHis.forEach(e => {
        checkResults = e.courseno;
      });

      if (checkResults == "N") {
        //alert('no his');
        sessionStorage.setItem('todoHis', JSON.stringify(this.todoHis));
      } else {
        console.log('todoHis------------- ' + JSON.stringify(this.todoHis));
        sessionStorage.setItem('todoHis', JSON.stringify(this.todoHis));
        if (this.todoHis != '' || this.todoHis != null && sessionStorage.getItem('stdcode') != null) {
        } else {
          alert('no his');
          location.reload();
        }
      }
    });
  }

  getCalendar() {
    this.apiFetchDate.getJSON().subscribe((res) => {
      this.todoCalendar = res.results;
      console.log(JSON.stringify(this.todoCalendar));
      var checkDate;
      this.todoCalendar.forEach(e => {
        checkDate = e.tmpYear;

      });
      //alert(Object.keys(checkDate).length);
      if (Object.keys(checkDate).length < 0) {
        this.chkcoursefull = false;
        alert('จำนวนการลงทะเบียนสอบเต็มแล้ว');
      } else {
        this._router.navigate(['course']);
      }


    });
  }


}
