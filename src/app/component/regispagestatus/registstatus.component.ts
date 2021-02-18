import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-registstatus',
  templateUrl: './registstatus.component.html',
  styleUrls: ['./registstatus.component.css']

})
export class RegisStatusPageCreateComponent implements OnInit {

  public allCourse: any = [];
  public us;
  public sem;
  public year;
  public majorname;
  public namethai;
  public facname;
  public todoresults: any = [];
  public flagcheck = false;
  constructor(
    private router: Router,
    private activerouter: ActivatedRoute,

  ) {

  }

  ngOnInit() {

    if (sessionStorage.getItem('chkregstatus') == '' || sessionStorage.getItem('chkregstatus') == null) {
      sessionStorage.setItem('chkregstatus', 'Y');
      location.reload();
    } else {
      this.todoresults = JSON.parse(sessionStorage.getItem('todoresults'));
      this.loading();
    }


  }


  showSpinner = false;
  loading() {
    if (this.todoresults == "" || this.todoresults == null || this.todoresults == undefined) {
      // window.location.reload();
      this.showSpinner = true;
      setTimeout(() => {
        this.showSpinner = false;
      }, 3000);
    }
    this.todoresults = JSON.parse(sessionStorage.getItem('todoresults'));
    this.chkregis(this.todoresults)
  }

  chkregis(obj) {
    let tmp;
    obj.forEach(e => {
        tmp = e.flag;
    });

    if (Number(tmp) > 0) {
        this.flagcheck;
    } else {
        this.flagcheck = true;
    }

  }

  backhome() {
    // this._location.back();
    sessionStorage.removeItem("todoresults");
    sessionStorage.removeItem("chkregstatus");
    this.router.navigate(['/']);
  }

  backSelectCourse() {
    // this._location.back();
    sessionStorage.removeItem("todoresults");
    sessionStorage.removeItem("chkregstatus");
    this.router.navigate(['course']);
  }
}
