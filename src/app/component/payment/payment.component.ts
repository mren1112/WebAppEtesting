import { Component } from "@angular/core";


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']

})


export class PaymentComponent{

  usr = "629949991";
  tel  = "0123456789";
  total = "1000";

  constructor(){  }

}
