import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { CustomValidation } from 'src/app/shared/customValidation'
import { HttpService } from '../http.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, RouteReuseStrategy } from "@angular/router";
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-forrgot-password',
  templateUrl: './forrgot-password.component.html',
  styleUrls: ['./forrgot-password.component.css']
})


export class ForrgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  email: any;

  validationMessages = {
    'email': {
      'required': 'email is required...'
    },

    'password': {
      'required': 'password is required...',
      // 'maxlength': 'password is not more than 8 characters...',
      // 'minlength': 'password has atleast 4 characters',
      'usernameField': 'password should contain atleast one number and one special character...'
    },

    'confirmPassword': {
      'required': 'confirm password is required...',
      'notEqual': 'password not matching...',
    }
  };

  formErrors = {
    'email': '',
    'password': '',
    'confirmPassword': ''
  };


  constructor(private fb: FormBuilder,
    private _services: HttpService,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      //email: ['', [Validators.required]],
      password: ['', [Validators.required, CustomValidation.passwordFieldValidator()]],
      confirmPassword: ['', [Validators.required]]
    })

    this.forgotPasswordForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.forgotPasswordForm);
    });


    this.  email = this.route.snapshot.paramMap.get("email")
    console.log("my email", this.email);

  }


  logValidationErrors(group: FormGroup = this.forgotPasswordForm): void {
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
    this._services.forgotPasword({ "password": this.forgotPasswordForm.value.password, "email": this.email }).subscribe((res: any) => {
      console.log(res.status);
      if (res.status === true) {
        this.toastr.success('done...', 'password change successfully', {
          timeOut: 2000
        });

      }
      else {
        this.toastr.error('something wrong', 'please try again', {
          positionClass: 'toast-top-right',
          timeOut: 2000
        });
      }
    })
  }

}
