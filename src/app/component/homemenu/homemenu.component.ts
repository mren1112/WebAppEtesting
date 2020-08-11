import { Component, Injectable, OnInit } from "@angular/core";
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterEvent, ActivatedRoute, ParamMap  } from "@angular/router";
import { ApiFetchProfileService, TodoProfile } from 'src/app/services/ApiFetchProfile.service';
import { stringify } from 'querystring';
import { ApiFetchCounterService } from 'src/app/services/ApiFetchCounter.service';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


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

  //-----------spinner----------------------

  showLoading = true;
  //----------------------------------------
  public id;


  constructor(
    private apiFetchProfile: ApiFetchProfileService,
    private apiGetCounter: ApiFetchCounterService,
    private httpClient: HttpClient,
    private _router: Router, private route: ActivatedRoute
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
    this.loading();
    this.getProfile();
    this.getCounter();
  }

  backClicked() {
    // this._location.back();
    sessionStorage.clear();
    window.location.href = 'https://beta-e-service.ru.ac.th/';
  }

  showSpinner = false;
  loading() {

    if (sessionStorage.getItem("stdcode") == "" || sessionStorage.getItem("stdcode") == null || sessionStorage.getItem("stdcode") == undefined) {
        sessionStorage.clear();
        window.location.href = 'https://beta-e-service.ru.ac.th/';
    } else {
      this.showSpinner = true;
      setTimeout(() => {
        this.showSpinner = false;
      }, 2000);
    }
  }

  mySubscription: any;
  getProfile() {

    if (sessionStorage.getItem("stdcode") != "") {
      this.id = sessionStorage.getItem("stdcode");
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
    console.log("id = "+this.id);

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
        console.log("todoProfile " + JSON.stringify(data));
        console.log("stdcode " + JSON.stringify(this.todoProfile.STD_CODE));
       // sessionStorage.setItem("stdcode", data.STD_CODE);
        sessionStorage.setItem("namethai", this.todoProfile.NameThai);
        sessionStorage.setItem("facno", this.todoProfile.FacNo);
        sessionStorage.setItem("majorno", this.todoProfile.MajorNo);
        sessionStorage.setItem("majornamthai", this.todoProfile.MajorNameThai);
        sessionStorage.setItem("facName", this.todoProfile.FacNameThai);
        sessionStorage.setItem("birth", this.todoProfile.Birth);
        sessionStorage.setItem("tel", this.todoProfile.tel);
          });

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


}
