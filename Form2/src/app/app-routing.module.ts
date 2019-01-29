import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
//import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
 // {path : 'list', component : ListEmployeeComponent},
  {path : 'create', component : CreateEmployeeComponent},
  {path : '', redirectTo:'/list', pathMatch:'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports : [RouterModule]
})
export class AppRoutingModule { }
