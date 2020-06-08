import { Component, ViewEncapsulation } from "@angular/core";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Component({
  selector: 'appcalendar',
  templateUrl: './calendarset.html',
  styleUrls: ['./calendarset.css'],
  encapsulation: ViewEncapsulation.None,

})

export class CalendarCustom{

  datemock = [
    {fixdate: 1},
    {fixdate: 2},
    {fixdate: 3}

  ];
  dateselect: string  = '';




  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const date = d.getDate();


    // Highlight the 1st and 20th day of each month.
    return (date === 1 || date === 20) ? 'dateAleart-class' : '';
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

}
