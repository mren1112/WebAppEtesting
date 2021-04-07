import { Component, Injectable, OnInit } from "@angular/core";
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterEvent, ActivatedRoute, ParamMap } from "@angular/router";
import { ApiFetchProfileService } from 'src/app/services/ApiFetchProfile.service';
import { stringify } from 'querystring';
import { map } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ApiFetchDateService } from 'src/app/services/ApiFetchDate.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { clear } from "console";


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
  showSpinner = false;
  //-----------------------------------------
  public sem = sessionStorage.getItem("sem");
  public year = sessionStorage.getItem("year");
  mySubscription: any;

  constructor(
    private apiFetchProfile: ApiFetchProfileService,
    //private apiFetchETCourse: ApiFetchETCourseService,
    private _router: Router,
    private route: ActivatedRoute,
    private apiFetchDate: ApiFetchDateService,
  ) { }


  ngOnInit() {
    this.chekLoadInit();
  }

  async chekLoadInit() {
    let getStd = await sessionStorage.getItem('stdcode');
    let seat = await JSON.parse(sessionStorage.getItem('todosys'));
    if ( getStd.length < 10 ) {
      alert('please login again');
      this.backClicked();
    }

    if (sessionStorage.getItem('chkop') == 'N') {
      this.chkStatus = true;
    }
    else {
      //  console.log("chkop = " + sessionStorage.getItem("chkop"));
      this.chkStatus = true;
    }

    this.loading();
    this.getProfile();
    sessionStorage.removeItem("subrefkey");
  }

  backClicked() {
    // this._location.back();
    sessionStorage.clear();
    localStorage.clear();
    //window.open('https://www.ru.ac.th/th/','_self');
    //window.location.replace("https://www.ru.ac.th/th/");
    window.location.href='https://www.ru.ac.th';
  }


  async loading() {
    if (sessionStorage.getItem("stdcode") == "" || sessionStorage.getItem("stdcode") == null || sessionStorage.getItem("stdcode") == undefined) {
      sessionStorage.clear();
      window.open('https://www.ru.ac.th');
    } else {
      if (sessionStorage.getItem("namethai")) {
        // location.reload();
        this.showSpinner = true;
        setTimeout(() => {
          this.showSpinner = false;
        }, 2000);
      } else {

        if (sessionStorage.getItem("chkop") === 'N') {
          //alert("chkop = " + sessionStorage.getItem("chkop"));
          this.chkStatus = false;
          //     alert('wtf')
        } else {
          //  console.log("chkop = " + sessionStorage.getItem("chkop"));
          this.chkStatus = true;
        }
      }
    }
  }

  async getProfile() {

    if (sessionStorage.getItem("stdcode") != "") {
      this.id = sessionStorage.getItem("stdcode");
      // this.getEtHisregister();
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

    let res = await this.apiFetchProfile.getJSON(this.id).toPromise();
    this.todoProfile = res;
    if (Object.keys(this.todoProfile).length === 0) {
      location.reload();
      //alert('Loading data faild please login again.');
    } else {

      sessionStorage.setItem("namethai", this.todoProfile.NameThai);
      sessionStorage.setItem("facno", this.todoProfile.FacNo);
      sessionStorage.setItem("majorno", this.todoProfile.MajorNo);
      sessionStorage.setItem("majornamthai", this.todoProfile.MajorNameThai);
      sessionStorage.setItem("facName", this.todoProfile.FacNameThai);
      sessionStorage.setItem("birth", this.todoProfile.Birth);

      if (this.todoProfile.NameThai === '') {
        alert('ไม่สามารถเข้าสู่ระบบได้่');
        this.logout();
      } else {
        if (this.todoProfile.tel == "" || this.todoProfile.tel == null) {
          alert('ท่านยังไม่ได้ระบุหมายเลขโทรศัพท์ กรุณาเพิ่มหมายเลขโทรศัพท์ที่สามารถติดต่อได้ที่ระบบ e-service. ก่อนทำการลงทะเบียน');
          this.logout();
        } else {
          sessionStorage.setItem("tel", this.todoProfile.tel);
        }
      }


    }
  }

  logout() {
    sessionStorage.removeItem("stdcode");
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = 'https://www.ru.ac.th';
  }

  async checkSystemStatus() {
    let tempA = await sessionStorage.getItem("chkop");
    let seat = await JSON.parse(sessionStorage.getItem('todosys'));
    console.log(seat.sumseat)
    //console.log('tempA = ' + tempA);
    if (Object.keys(tempA).length === 0 || tempA == null) {
      window.location.reload();
      setTimeout(() => {
        this.showSpinner = false;
      }, 2000);
    }

    //var tmp;
    setTimeout(function () { let tmp = JSON.stringify(tempA) }, 100);
    //this.getCalendar();
    if (tempA === 'N' || Number(seat.sumseat) == 0) {
      //alert('ไม่อยู่ในช่วงการลงทะเบียน!');
      // this.router.navigate(['systemcomponent']);
    } else {
     // this._router.navigate(['course']);
      // this.getCalendar();
    }

  }

 /* async getCalendar() {
    let res = await this.apiFetchDate.getJSON().toPromise();
    if (res) {
      this.todoCalendar = res.results || {};
      var checkDate;
      this.todoCalendar.forEach(e => {
        checkDate = e.tmpYear;

      });
      if (Object.keys(checkDate).length < 1) {
        this.chkcoursefull = false;
        alert('จำนวนการลงทะเบียนสอบเต็มแล้ว');
      } else {
        this._router.navigate(['course']);
      }
    }

  }*/


}
