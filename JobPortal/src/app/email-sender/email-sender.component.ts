import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { CustomValidation } from 'src/app/shared/customValidation'
import { HttpService } from '../http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-email-sender',
  templateUrl: './email-sender.component.html',
  styleUrls: ['./email-sender.component.css']
})
export class EmailSenderComponent implements OnInit {

  emailForm: FormGroup;

  validationMessages = {
    'email': {
      'required': 'email is required...'
    },
  };

  formErrors = {
    'email': '',
  };

  constructor(private fb: FormBuilder,
    private _services: HttpService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {

    this.emailForm = this.fb.group({
      email: ['', [Validators.required]]
    })

    this.emailForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.emailForm);
    });
  }


  logValidationErrors(group: FormGroup = this.emailForm): void {
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


    this._services.checkEmail({ "email": this.emailForm.value.email }).subscribe((res: any) => {
      console.log(res.status);
      if (res.status === true) {
        console.log("in if", this.emailForm.value.email)
        this.toastr.error('this is not registered email...');

      }
      else {
        this._services.emailSender(this.emailForm.value).subscribe((res: any) => {
          if (res.status === true) {
            alert("message sent check your email...");
            this.router.navigate(['/login']);

          }
        })
      }
    })


  }


}
