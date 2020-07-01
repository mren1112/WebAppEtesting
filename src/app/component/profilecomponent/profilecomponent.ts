import { Component } from '@angular/core';


@Component({
  selector: 'app-profilecomponent',
  templateUrl: './profilecomponent.html',
  //styleUrls: ['./profilecomponent.css']

})
export class ProfileComponent{
  us = sessionStorage.getItem("stdcode");
  sem = sessionStorage.getItem("sem");
  year = sessionStorage.getItem("year");
  majorname = sessionStorage.getItem("majornamthai");
  namethai = sessionStorage.getItem("namethai");
  facname = sessionStorage.getItem("facName");
  constructor(){

  }

}
