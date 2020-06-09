import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpClientModule,
  HttpHeaders,
  HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './component/header/header.component';
import { CourseComponent } from './component/couseselect/course.component';
import { FooterCreateComponent } from './footer/footers.component';
import { CalendarCustom } from './component/calendar/calendarset';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CourseComponent,
    FooterCreateComponent,
    CalendarCustom,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatDividerModule,
    HttpClientModule,
    Injectable,
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
    Observable,
  ],
  providers: [
    MatDatepickerModule,
    
    //{provide: LOCALE_ID, useValue: 'en' },
    //{ provide: LOCALE_ID, useValue: "th-TH" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
