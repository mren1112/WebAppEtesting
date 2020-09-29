import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']

})
export class InfoCreateComponent implements OnInit{

   _dtmocrep = [
    {}
  ]

  public chkdatainfo = false;

  constructor(){

  }
  ngOnInit() {
    if (sessionStorage.getItem('stdcode') == null) {
      alert('please login again');
      this.backClicked();
    }
  }

  backClicked() {
    // this._location.back();
    sessionStorage.clear();
    window.location.href = 'https://www.ru.ac.th/th/';
  }
}
