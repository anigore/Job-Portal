
import { Candidate } from './../candidateSchema';
import { HttpService } from '../http.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { State } from '../stateScema';
import { from } from 'rxjs';
import { CustomValidation } from 'src/app/shared/customValidation'

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ImageUploadComponent } from '../image-upload/image-upload.component';


// enum Gender {
//   male = 0,
//   female = 1
// }



@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  states: State[];
  gender: string[];
  candidateForm: FormGroup;
  uniqueUsername: any;
  uniqueEmail: any;

  hobbies = [
    { id: 1, hobbie: 'cricket' },
    { id: 2, hobbie: 'singing' },
    { id: 3, hobbie: 'dancing' },
    { id: 4, hobbie: 'acting' }
  ];



  validationMessages = {
    'firstName': {
      'required': 'Full Name is required...'
    },

    'lastName': {
      'required': 'Full Name is required...'
    },

    'email': {
      'required': 'email is required...',
      'emailField': 'Entar valid email address...'
    },

    'gender': {
      'required': 'confirm email is required...',
    },

    'hobbies': {
      'required': 'confirm email is required...',
    },

    'dateOfBirth': {
      'required': 'date of birth is required...',
    },

    'passwordGroup': {
      'passwordMisMatch': 'password not matching...'
    },

    'phoneNumber': {
      'required': 'phone number is required...',
      'maxlength': 'length should be 10 only...',
    },

    'city': {
      'required': 'city is required...'
    },

    'address': {
      'required': 'address is required...'
    },

    'state': {
      'required': 'state is required...'
    },

    'photo': {
      'required': 'photo is required...'
    },

    'password': {
      'required': 'password is required...',
      'maxlength': 'password is not more than 8 characters...',
      'minlength': 'password has atleast 4 characters',
      'passwordField': 'password should contain atleast one number and one special character...'
    },

    'username': {
      'required': 'username is required...',
      'usernameField': 'username should be in small letters...',
      'uniqueUsername': 'not unique..'
    },

    'confirmPassword': {
      'required': 'confirm password is required...',
      'notEqual': 'password not matching...',


    },

    'zipcode': {
      'required': 'zipcode is required...',
      'maxlength': 'zip code only have  6 number...',
      'minlength': 'zip code only have  6 number...',
    }
  };

  formErrors = {
    'firstName': '',
    'lastName': '',
    'gender': '',
    'hobbies': '',
    'phoneNumber': '',
    'address': '',
    'city': '',
    'state': '',
    'zipcode': '',
    'email': '',
    'password': '',
    'confirmaPassword': '',
    'username': '',
    'dateOfBirth': '',
    'photo': ''

  }



  constructor(private fb: FormBuilder,
    private _services: HttpService,
    private toastr: ToastrService,
    private router: Router,
    private imageUploader: ImageUploadComponent) { }

  ngOnInit() {


    // for gender enum
   // var gender = Object.keys(Gender);
    //this.gender = gender.slice(gender.length / 2);
    const formControls = this.hobbies.map(control => new FormControl(false));

    this.candidateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      hobbies: new FormArray(formControls),
      phoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
      email: ['', [Validators.required, CustomValidation.emailFieldValidator()]],
      password: ['', [Validators.required, CustomValidation.passwordFieldValidator(), Validators.maxLength(8), Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required,]],
      dateOfBirth: ['', Validators.required],
      username: ['', [Validators.required, CustomValidation.usernameFieldValidator()]],
      photo: ['', Validators.required]
    });

    this.candidateForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.candidateForm);
    });
    this.stateList();
  }

  /* ** Taking state list from server */
  stateList(): void {
    console.log('inside state list');
    this._services.getStateList().subscribe((data: any) => {
      this.states = data.docs;
      console.log(this.states)
    })
  }


  /* ** comman validation function */
  logValidationErrors(group: FormGroup = this.candidateForm): void {
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

  // /** */
  // selectedHobbies() {
  //   const selectedHobbie = this.candidateForm.value.hobbies.map((checked, index) => checked)
  // }

  /**function to get image and send to imageUploader component */

  onFileChanged(inpuImage) {
    this.imageUploader.processFile(inpuImage)
  }

  /* ** Adding data on server */

  onClick() {
    const selectedPreferences = this.candidateForm.value.hobbies

      .map((checked, index) => checked ? this.hobbies[index].hobbie : null)
      .filter(value => value !== null);

    this.candidateForm.controls['hobbies'].patchValue(selectedPreferences);
    console.log("inside candidate", this.candidateForm);

    this._services.creatCandidate(this.candidateForm.value).subscribe((res: any) => { alert('data addded') });
    this.router.navigateByUrl('/login')
  }


  /** checking unique email.. */

  onEmailChanged() {
    this._services.checkEmail({ "email": this.candidateForm.value.email }).subscribe((res: any) => {
      console.log(res.status);
      if (res.status === true) {
        this.uniqueEmail = false

      }
      else {
        this.uniqueEmail = true
      }
    })
  }


  onUsernameChanged() {
    this._services.checkUsername({ "username": this.candidateForm.value.username }).subscribe((res: any) => {

      if (res.status === true) {
        this.uniqueUsername = false

      }
      else {
        this.uniqueUsername = true
      }
    })
  }
}

