import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ApiFetchCounterService } from "src/app/services/ApiFetchCounter.service";
import { throwMatDialogContentAlreadyAttachedError } from "@angular/material/dialog";
import { BnNgIdleService } from "bn-ng-idle";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']

})


export class LandingPageComponent implements OnInit {

  public id;
  public todosys: any = [];
  public todoHis: any = [];

  checkClose = false;
  todoCounter: any = [];
  constructor(private router: Router, private route: ActivatedRoute,
    private apiGetCounter: ApiFetchCounterService,private bnIdle: BnNgIdleService) {

      this.bnIdle.startWatching(1800).subscribe((res) => {
        if(res) {
            //console.log("session expired");
            alert("Session expired, please login again");
            this.logout();
        }
      })
  }

  logout() {
    sessionStorage.removeItem("stdcode");
    sessionStorage.clear();
    localStorage.clear();
    window.open('https://www.ru.ac.th/th/');
   // window.location.href = 'https://www.ru.ac.th/th/';
  }


  ngOnInit() {
    //  this.checkSystemStatus();
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      sessionStorage.clear();
      localStorage.clear();
      // console.log("idddd = " + this.id);
    });

    if (this.id === null) {
      alert("null");
    } else {
      // alert("not null");
      this.id = sessionStorage.setItem("stdcode", this.id);
      this.loading();
      this.getCounter();
    }
  }

  showSpinner = false;
  loading() {
    if (sessionStorage.getItem("stdcode") == "" || sessionStorage.getItem("stdcode") == null || sessionStorage.getItem("stdcode") == undefined) {
      this.showSpinner = true;
      setTimeout(() => {
        this.showSpinner = false;
      }, 3000);
    }
    // this.checkSystemStatus();
  }

  async getCounter() {
    /*this.apiGetCounter.getJSON().subscribe(res => {
      this.todoCounter = res;
      // console.log("todoCounter" + JSON.stringify(res))
    })//*/

    let res = await this.apiGetCounter.getJSON().toPromise();
    this.todoCounter = res || {};
    this.todosys = res;
    sessionStorage.setItem("sem", res.semester);
    sessionStorage.setItem("year", res.year);
    sessionStorage.setItem("enddate", res.enddate);
    sessionStorage.setItem("startdate", res.startdate);
    sessionStorage.setItem("todosys", JSON.stringify(this.todoCounter));
     sessionStorage.setItem("SYS_CLOSE", this.todosys.SYS_CLOSE);
    //sessionStorage.setItem("chkop", this.todosys.close);
    sessionStorage.setItem("chkop", 'Y');
   // console.log("todoCounter" + JSON.stringify(res))
    setTimeout(() => {
      this.showSpinner = false;
    }, 1000);
    if (this.todosys.SYS_CLOSE === 'N') {
      this.checkClose = true;
      //alert('System Close!');
      //  this.router.navigate(['systemcomponent']);
    }
  }

  closePage() {
    sessionStorage.clear();
    localStorage.clear();
    window.open('https://beta-e-service.ru.ac.th', "_self");
    // win.close()
  }

  async checkSystemStatus() {
    /*let tempA: any = [];
      this.apiCheckSystem.getJSON().subscribe((data) => {
      this.todosys = data;
    //  tempA = JSON.parse(sessionStorage.getItem("todosys"));

    //  console.log('todosys = ' + JSON.stringify(this.todosys));

      if (Object.keys(this.todosys).length === 0 || this.todosys == null || tempA ==  "") {
        window.location.reload();
        setTimeout(() => {
          this.showSpinner = false;
        }, 2000);
      }

      var tmp;
      //setTimeout(function () { tmp = JSON.stringify(tempA.close) }, 100);

      console.log('tempA.close = ' + JSON.stringify(tempA.close));
      if (tempA.close === 'Y') {
        alert('System Close!');
        this.router.navigate(['systemcomponent']);
      }
    });//*/

    /*let res = await this.apiCheckSystem.getJSON().toPromise();
    if (res) {
      this.todosys = res;
      sessionStorage.setItem("todosys", JSON.stringify(this.todosys));
      sessionStorage.setItem("chkop", this.todosys.close)
      setTimeout(() => {
        this.showSpinner = false;
      }, 1000);
      if (this.todosys.close === 'Y') {
        alert('System Close!');
      //  this.router.navigate(['systemcomponent']);
      }
    }*/

  }








}
