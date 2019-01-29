import { AuthGuard } from './auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppRoutingModule,routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './http.service';
import { FetchDataService } from './fetch-data.service';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {NgxMaskModule} from 'ngx-mask'
import { UniquePasswordValidatorDirective } from './shared/unique-password-validator.directive';
import { LoginPageComponent } from './login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForrgotPasswordComponent } from './forrgot-password/forrgot-password.component';
import { EmailSenderComponent } from './email-sender/email-sender.component';
import { PhotoAploadComponent } from './photo-apload/photo-apload.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { DemoLoginComponent } from './demo-login/demo-login.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    UniquePasswordValidatorDirective,
    LoginPageComponent,
    DashboardComponent,
    ForrgotPasswordComponent,
    routing,
    EmailSenderComponent,
    PhotoAploadComponent,
    ImageUploadComponent,
    DemoLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
    
  ],
  providers: [HttpService,AuthGuard,ImageUploadComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
