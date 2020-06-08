import { Component, ViewEncapsulation } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CourseComponent {

  coursetest = [
    { courseno: 1, coursename: 'COS2105', credit: 3 },
    { courseno: 2, coursename: 'COS2105', credit: 3 },
    { courseno: 2, coursename: 'COS2105', credit: 3 },
    { courseno: 2, coursename: 'COS2105', credit: 3 }
  ];

  sectionfix = [
    { sect: 1 },
    { sect: 2 },
    { sect: 3 }
  ]

  selectCourseCmplt: boolean = false;
  selectCourse: boolean = true;
  isChecked = false;
  sectionselect: boolean = true;
  public dateselect: string = '';
  selectArr = [];

  constructor() {

  }


  // mock data
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  datemock = [
    { fixdate: 1 },
    { fixdate: 2 },
    { fixdate: 3 }

  ];
  //paint alert day
  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const date = d.getDate();


    // Highlight the 1st and 20th day of each month.
    return (date === 1 || date === 15) ? 'dateAleart-class' : '';
  }



  //disable select holiday
  myFilter = (d: Date | null): boolean => {

    /*for (let i = 0; i < this.datemock.length; i++) {
      const element = this.datemock[i].fixdate;

      if ( d ===  true) {
        const day= (d || new Date()).getDay()
        return day !== 0 && day !== 6;
      }

    }*/
    const day = (d || new Date()).getDay()

    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }


  //check box event
  checkValue(event: any) {
    if (event != "B") {
      this.selectCourse = false;
      console.log(" เข้า " + event);
    } {
      this.selectCourse = true;
      console.log(" เข้า - " + event);
    }

    //console.log(event);
  }

  toggleVisibility(e) {
    console.log(e)

    if ( this.coursetest[e].courseno != this.coursetest[e].courseno) {
      this.isChecked;
      this.selectCourse = false;
    } else
      this.isChecked = e.target.checked;
      //this.selectCourse = true;
  }



}




