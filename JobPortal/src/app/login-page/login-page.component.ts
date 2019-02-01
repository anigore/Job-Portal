import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { CustomValidation } from 'src/app/shared/customValidation'
import { HttpService } from '../http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  token : any;

  validationMessages = {
    'username': {
      'required': 'username is required...',
      'usernameField': 'username should be in small letters...'
    },

    'password': {
      'required': 'password is required...'
    }
  };

  formErrors = {
    'username': '',
    'password': ''
  };

  constructor(private fb: FormBuilder,
              private _services: HttpService,
              private toastr: ToastrService,
              private router: Router,) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, , CustomValidation.usernameFieldValidator()]],
      password: ['', [Validators.required]]
    })

    this.loginForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.loginForm);
    });

    if(this._services.isloggedIn()){
      this.router.navigate(['/dashboard']);
    }
  }


  logValidationErrors(group: FormGroup = this.loginForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationMessages[key];

        for (const errorkey in abstractControl.errors) {
          if (errorkey) {
            this.formErrors[key] += messages[errorkey] + ' ';

          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }

  onClick() {
    this._services.loginCheck(this.loginForm.value).subscribe((res: any) => {
      if (res.status === true) {
        this.toastr.success('Welcome to Job Portal','login succesfuly',{
          timeOut: 2000
        });
        this.token = res.username;
        this._services.setToken(this.token);
        console.log("token",this.token);
        this.router.navigate(['/dashboard']);
        //this._services.setLoggedIn(true)
      }
      else {
        this.toastr.error('You are not valid user', 'not login in', {
          positionClass: 'toast-top-right' ,
          timeOut: 2000
       });
      }
    })
  }

  forgotPassword(){

    console.log("succesfully come")

  }
}
