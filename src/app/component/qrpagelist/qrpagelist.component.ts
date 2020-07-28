import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiFetchQrPaymentService } from 'src/app/services/ApiFetchQrpayment.service';

@Component({
  selector: 'app-policyh',
  templateUrl: './qrpagelist.component.html',
  styleUrls: ['./qrpagelist.component.css'],
  providers: [DatePipe]
})
export class QrpagelistCreateComponent implements OnInit{

   public us = sessionStorage.getItem('stdcode');

   public currentTime = new Date();
    public todoQrdatalist: any = [];

  constructor(private apiFetchQrPaylist:ApiFetchQrPaymentService){

  }
  ngOnInit() {
    console.log(this.currentTime);
    if (sessionStorage.getItem('stdcode') == null) {
      alert('please login again');
      this.backClicked();
    } else {
        this.getQrDatalist();
    }
  }

  backClicked() {
    // this._location.back();
    sessionStorage.clear();
    window.location.href = 'https://beta-e-service.ru.ac.th/';
  }

  getQrDatalist() {
    this.apiFetchQrPaylist.getJSON().subscribe((data)=> {
        this.todoQrdatalist = data.results;

    });

  }

}
