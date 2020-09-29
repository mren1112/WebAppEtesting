import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

}
)
export class HeaderComponent implements OnInit {
  public us;

  constructor(private bnIdle: BnNgIdleService) {
    this.bnIdle.startWatching(1800).subscribe((res) => {
      if(res) {
          //console.log("session expired");
          alert("Session expired, please login again");
          this.logout();
      }
    })
  }

  ngOnInit() {
    this.us = sessionStorage.getItem("stdcode");
    if (this.us== null) {
      alert('please login again');
      this.backClicked();
    }
  }

  logout() {
    sessionStorage.removeItem("stdcode");
    sessionStorage.clear();
   // window.open('https://www.ru.ac.th/th/');
    window.location.href = 'https://www.ru.ac.th/th/';
  }

  backClicked() {
    // this._location.back();
    sessionStorage.clear();
   // window.open('https://www.ru.ac.th/th/');
     window.location.href = 'https://www.ru.ac.th/th/';
  }
}
export class ToolbarMultirowExample {


}
