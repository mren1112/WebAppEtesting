import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-pdf',
  templateUrl: './generateslipt.component.html',
  styleUrls: ['./generateslipt.component.css']

}
)
export class GenerateSlipComponent implements OnInit {
  public us;

  constructor() {
  }

  ngOnInit() {
    this.us = sessionStorage.getItem("stdcode");
    if (this.us== null) {
      alert('please login again');
      this.backClicked();
    }
  }


 public logout() {
    sessionStorage.removeItem("stdcode");
    sessionStorage.clear();
    window.location.href = 'https://www.ru.ac.th/th/';
  }

 public backClicked() {
    // this._location.back();
    sessionStorage.clear();
    window.location.href = 'https://www.ru.ac.th/th/';
  }
}
