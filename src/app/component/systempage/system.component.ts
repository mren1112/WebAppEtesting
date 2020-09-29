import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-chk-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']

})


export class SystemPageComponent implements OnInit {

  constructor(
    private router: Router, private route: ActivatedRoute) {


  }

  ngOnInit() {

      this.loading();
  }

  loading() {
    if (sessionStorage.getItem("stdcode") == "" || sessionStorage.getItem("stdcode") == null || sessionStorage.getItem("stdcode") == undefined) {
      setTimeout(window.location.href = 'https://www.ru.ac.th/th/', 5000);

    }
  }
  closeApp() {
    sessionStorage.clear();
   // window.open('https://www.ru.ac.th/th/');
     window.location.href = 'https://www.ru.ac.th/th/';
}

}
