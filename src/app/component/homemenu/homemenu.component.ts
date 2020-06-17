import { Component, OnInit } from "@angular/core";


@Component({
selector: 'app-menu',
templateUrl: './homemenu.component.html',
styleUrls: ['./homemenu.component.css']
})

export class HomeMenuCreateComponent implements OnInit {
public stdcode = "629949991"

constructor(){}


ngOnInit(){

  sessionStorage.setItem("stdcode" , this.stdcode);
  console.log("stdcode = " + this.stdcode);
}

}
