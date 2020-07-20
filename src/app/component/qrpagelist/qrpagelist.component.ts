import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-policyh',
  templateUrl: './qrpagelist.component.html',
  styleUrls: ['./qrpagelist.component.css']

})
export class QrpagelistCreateComponent implements OnInit{

   public us = sessionStorage.getItem('stdcode');

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
    window.location.href = 'https://beta-e-service.ru.ac.th/';
  }
}
