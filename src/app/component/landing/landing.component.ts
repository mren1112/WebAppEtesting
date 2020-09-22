import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { ApiCheckSystemService } from 'src/app/services/ApiCheckSystem.Service';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']

})


export class LandingPageComponent implements OnInit {

  public id;
  public todosys: any = [];
  constructor(private apiCheckSystem: ApiCheckSystemService,
    private router: Router, private route: ActivatedRoute,
    private httpClient: HttpClient) {


  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log("idddd = " + this.id);
    });

    if (this.id === null) {
      alert("null");
    } else {
      // alert("not null");
      this.id = sessionStorage.setItem("stdcode", this.id);
      this.loading();
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

  checkSystemStatus() {
    var tempA: any = [];
    //this.httpClient.get('http://sevkn.ru.ac.th/etest/chksystem.jsp').subscribe((data) => {
       this.apiCheckSystem.getJSON().subscribe((data) => {
      this.todosys = data;
      tempA = JSON.parse(sessionStorage.getItem("todosys"));
      console.log('todosys = ' + JSON.stringify(this.todosys));

      if (Object.keys(this.todosys).length === 0 || this.todosys == null) {
        window.location.reload();
        setTimeout(() => {
          this.showSpinner = false;
        }, 2000);
      }

      var tmp;
      setTimeout(function () { tmp = JSON.stringify(tempA.close) }, 100);

      console.log('tempA.close = ' + JSON.stringify(tempA.close));
      if (tempA.close === 'Y') {
        alert('System Close!');
        this.router.navigate(['systemcomponent']);
      }
    });
  }

}
