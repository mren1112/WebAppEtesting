import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-info',
  templateUrl: './reciept.component.html',
  styleUrls: ['./reciept.component.css']

})
export class RecieptAllCreateComponent implements OnInit{

   _dtmocrep = [
    {}
  ]

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
