import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']

})


export class LandingPageComponent implements OnInit {

  public id;

  constructor(private _router: Router, private route: ActivatedRoute){


   }

   ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log("idddd = "+this.id);
      });

      if (this.id === null ) {
        alert("null");
      }else{
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
  }

}
