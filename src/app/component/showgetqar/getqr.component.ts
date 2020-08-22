import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-slipt',
  templateUrl: './getqr.component.html',
  styleUrls: ['./getqr.component.css']

})
export class GetQrComponent implements OnInit {

  public allCourse: any = [];
  public us;
  public sem;
  public year;
  public majorname;
  public namethai;
  public facname;

  constructor(  ) {

  }

  ngOnInit(  ) {
      console.log();
  }


}
