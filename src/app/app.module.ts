import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClient, HttpClientModule,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import "@angular/compiler";
import { RouterModule,Routes } from '@angular/router';

import { MatToolbarModule, MatToolbarRow } from '@angular/material/toolbar';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './component/header/header.component';
import { CourseComponent } from './component/couseselect/course.component';
import { FooterCreateComponent } from './footer/footers.component';
import { ApiFetchCourseService } from './services/ApiFetchCourseService.service';
import { ApiGetTermValService } from './services/ApiGetValTerm.service';
import { ConfirmComponent } from './component/confirm/confirm.component';
import { PaymentComponent } from './component/payment/payment.component';
import { HomeMenuCreateComponent } from './component/homemenu/homemenu.component';
import { InfoCreateComponent } from './component/info/info.component';
import { RegisAllCourseCreateComponent } from './component/regisallcourse/regisallcourse.component';
import { HisRegisAllCreateComponent } from './component/hisregister/hisregister.component';
import { RecieptAllCreateComponent } from './component/recieptsall/reciept.component';
import { ApiFetchAllCourseRegisService } from './services/ApiFetchAllCourseRegis.service';
import { PolicyCreateComponent } from './component/policy/policy.component';
import { QrpagelistCreateComponent } from './component/qrpagelist/qrpagelist.component';
import { ProfileComponent } from './component/profilecomponent/profilecomponent';
import { TestComponent } from './component/testcode/test.comp';
import { ApiFetchETCourseService } from './services/ApiFetchETCourse.service';
import { ApiFetchProfileService } from './services/ApiFetchProfile.service';
import { ApiFetchCounterService } from './services/ApiFetchCounter.service';
import { ApiFetchDateService } from './services/ApiFetchDate.service';
import { ApiFetchDateSectionService } from './services/ApiFecthDateSection.service';
import { ApiConfirmService } from './services/ApiConfirm.service';
import { HttpModule } from '@angular/http';

const appRoutes:Routes=[
  {path:"", component:HomeMenuCreateComponent},
  {path:"course", component:CourseComponent},
  {path:'confirm', component:ConfirmComponent },
  {path:"payment", component:PaymentComponent},
  {path:"info", component:InfoCreateComponent},
  {path:"regisall", component:RegisAllCourseCreateComponent},
  {path:"hisregisall", component:HisRegisAllCreateComponent},
  {path:"recieptall", component:RecieptAllCreateComponent},
  {path:"policy", component:PolicyCreateComponent},
  {path:"qrpagelist", component:QrpagelistCreateComponent},
  {path:"testing", component:TestComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CourseComponent,
    FooterCreateComponent,
    ConfirmComponent,
    PaymentComponent,
    HomeMenuCreateComponent,
    InfoCreateComponent,
    RegisAllCourseCreateComponent,
    HisRegisAllCreateComponent,
    RecieptAllCreateComponent,
    PolicyCreateComponent,
    QrpagelistCreateComponent,
    ProfileComponent,
    TestComponent,


  ],
  imports: [
    BrowserModule,
    HttpModule,
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
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
     RouterModule.forRoot(appRoutes),

  ],
  exports: [RouterModule],
  providers: [
    MatDatepickerModule,
    ApiFetchCourseService,
    ApiGetTermValService,
    ApiFetchAllCourseRegisService,
    ApiFetchETCourseService,
    ApiFetchProfileService,
    ApiFetchCounterService,
    ApiFetchDateService,
    ApiFetchDateSectionService,
    ApiConfirmService,
    //{provide: LOCALE_ID, useValue: 'en' },
    //{ provide: LOCALE_ID, useValue: "th-TH" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
