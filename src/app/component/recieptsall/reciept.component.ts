import { Component, OnInit } from '@angular/core';
import { ApiFetchRecieptService } from 'src/app/services/ApiFetchReciept.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-info',
  templateUrl: './reciept.component.html',
  styleUrls: ['./reciept.component.css']

})
export class RecieptAllCreateComponent implements OnInit {

  public us;
  public currentTime = new Date();
  public todoQrdatalist: any = [];
  // public us;
  public sem;
  public year;
  public telnum;
  public refkey;
  public total;
  public duedate;
  public duetime = "2359";
  public urlFecthqar;
  public todolist: any = [];
  public tmptodoCourse: any = [];
  public cntTodoCourse;
  public txtsem;
  public namethai;
  public chkTodoCourse = false;
  //get Date
  curDate = new Date();
  public arrDateToStr: any[] = [];

  constructor(private ApiFetchReciept: ApiFetchRecieptService,
    private router:Router,
    private activerouter:ActivatedRoute,
    private http: HttpClient

  ) {

  }
  ngOnInit() {
    if (sessionStorage.getItem("stdcode") == null) {
      alert('please login again');
      this.backClicked();
    } else {
      this.us = sessionStorage.getItem('stdcode');
      if (sessionStorage.getItem('reloadslip') == null) {
        window.location.reload();
        sessionStorage.setItem('reloadslip','Y')
      }
      this.getProfileData();
    }
  }

  getProfileData() {

    this.sem = sessionStorage.getItem("sem");
    this.year = sessionStorage.getItem("year");
    this.us = sessionStorage.getItem("stdcode");
    this.telnum = sessionStorage.getItem("tel");
    this.namethai = sessionStorage.getItem("namethai");
    this. getRepList();

  }

  getRepList() {
    this.ApiFetchReciept.getJSON().subscribe((data) =>{
      this.todolist = data.results;
      var cnt = Object.keys(this.todolist).length;
      //alert(cnt);
      if (cnt === 0) {
          this.chkTodoCourse = true;
      }else{
        this.chkTodoCourse = false;
    }
    });

  }

  getSlip(refkey) {
   // this.router.navigate(['generateslipt']);
  // window.open('https://devtest.ru.ac.th/ThaiQR/eTestQR?totalAmount?xx='+this.us, "_blank");


  /*this.http.post<any>('http://sevkn.ru.ac.th:8888/etestgbackend/GetSlipt/'
  , { stdcode:this.us,refkey:refkey,sem:this.sem,year:this.year}).subscribe({
    //next: data => this.postId = data.id,
    error: error => console.error('There was an error!', error)
})*/


   if (refkey != '') {
     //btoa(this.us)
   //  console.log('BTOA = '+btoa(this.us));
    //window.open('http://localhost:8113/etestgbackend/GetSlipt?stdcode='+btoa(this.us)+'&refkey='+btoa(refkey)+'&sem='+btoa(this.sem)+'&year='+btoa(this.year), "_blank");
    window.open('http://sevkn.ru.ac.th:8888/etestgbackend/GetSlipt?stdcode='+btoa(this.us)+'&refkey='+btoa(refkey)+'&sem='+btoa(this.sem)+'&year='+btoa(this.year), "_blank");

  } else {
    alert("Can't load Data please reload now!");
    this.router.navigate(['qrpagelist']);
  }


  }

  backClicked() {
    // this._location.back();
    sessionStorage.removeItem("stdcode");

    sessionStorage.clear();
    window.location.href = 'https://www.ru.ac.th/th/';
  }

  backhome() {
    // this._location.back();
    sessionStorage.removeItem("reloadslip");
    this.router.navigate(['/']);
  }
}
