import { AuthGuard } from './auth.guard';
import { ForrgotPasswordComponent } from './forrgot-password/forrgot-password.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmailSenderComponent } from './email-sender/email-sender.component';

const routes : Routes=[
  {path:'registration' , component : RegistrationFormComponent},
  {path:'login',component:LoginPageComponent},
  {path:'dashboard' , component : DashboardComponent,canActivate:[AuthGuard]},
  {path:'forgotPassword/:email',component:ForrgotPasswordComponent},
  {path:'emailSender',component:EmailSenderComponent},
  {path:'',redirectTo:'login',pathMatch:'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routing = [
  RegistrationFormComponent
]

