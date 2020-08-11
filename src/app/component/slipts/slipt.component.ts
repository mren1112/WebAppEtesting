import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-slipt',
  templateUrl: './slipt.component.html',
  styleUrls: ['./slipt.component.css']

})
export class SliptComponent implements OnInit {

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
