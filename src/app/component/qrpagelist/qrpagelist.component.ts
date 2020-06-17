import { Component } from '@angular/core';


@Component({
  selector: 'app-policyh',
  templateUrl: './qrpagelist.component.html',
  styleUrls: ['./qrpagelist.component.css']

})
export class QrpagelistCreateComponent{

   public us = sessionStorage.getItem('stdcode');

  constructor(){

  }

}
