import { Component, Injectable, OnInit } from "@angular/core";
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterEvent } from "@angular/router";
import { ApiFetchProfileService, TodoProfile } from 'src/app/services/ApiFetchProfile.service';
import { stringify } from 'querystring';
import { ApiFetchCounterService } from 'src/app/services/ApiFetchCounter.service';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';


@Component({
  selector: 'app-menu',
  templateUrl: './homemenu.component.html',
  styleUrls: ['./homemenu.component.css']
})

export class HomeMenuCreateComponent implements OnInit {
  public stdcode;
  todoProfile: any[];
  todoCounter: any[];
  public us;
  //todos:TodoProfile[] = [];

  //-----------spinner----------------------

  showLoading = true;
  //----------------------------------------



  constructor(
    private apiFetchProfile: ApiFetchProfileService,
    private apiGetCounter: ApiFetchCounterService,
    private _router: Router,
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

    this.getProfile();
    this.loading();
    this.getCounter();
  }


  showSpinner = false;
  loading() {
    if (sessionStorage.getItem("stdcode") == "" || sessionStorage.getItem("stdcode") == null  || sessionStorage.getItem("stdcode") == undefined) {
      this.showSpinner =true;
          setTimeout(() => {
              this.showSpinner = false;
          }, 5000);
    }
  }

  getProfile() {
    this.apiFetchProfile.getJSON().subscribe(data => {
      this.todoProfile = data;
      console.log("todoProfile " + JSON.stringify(data));
      console.log("stdcode " + JSON.stringify(data.STD_CODE));
      /*sessionStorage.setItem("stdcode", data.STD_CODE);
       sessionStorage.setItem("namethai", data.NameThai);
       sessionStorage.setItem("facno", data.FacNo);
       sessionStorage.setItem("majorno", data.MajorNo);
       sessionStorage.setItem("majornamthai", data.MajorNameThai);
       sessionStorage.setItem("facName", data.FacNameThai);
       sessionStorage.setItem("birth", data.Birth);*/
      //this.us = JSON.stringify(data.STD_CODE);
    }

    )
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
