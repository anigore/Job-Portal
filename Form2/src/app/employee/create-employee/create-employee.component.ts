
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { AbstractControl} from'@angular/forms';
import { CustomValidators } from 'src/app/shared/custom.validators';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm : FormGroup;

  validationMessages = {
    'fullName' : {
      'required' : 'Full Name is required...',
      'minlength' : 'Full name must greater than 2 characters...',
      'maxlength' : 'Full name must less than 10 characters...',
    },

    'email' : {
      'required' : 'email is required...',
      'emailDomain' : 'email Domain should be angular.com'
    },

    'confirmEmail' : {
      'required' : 'confirm email is required...',
    },

    'emailGroup' : {
      'emailMisMatch' : 'both emails are not matching...'
    },

    'phone' : {
      'required' : 'phone number is required...'
    },

    'skillName' : {
      'required' : 'Skill name is required...'
    },

    'experienceInYears' : {
      'required' : 'experience is required...'
    },

    'proficiency' : {
      'required' : 'proficiency is required...'
    }
  };

  formErrors = {
    'fullName' : '',
    'email': '',
    'confirmEmail' : '',
    'emailGroup' : '',
    'phone' : '',
    'skillName' : '',
    'experienceInYears' : '',
    'proficiency' : ''
  };

  constructor(private fb : FormBuilder ) { }

  ngOnInit() {

    this.employeeForm = this.fb.group({
      fullName : ['',[Validators.required,Validators.minLength(2),Validators.maxLength(12)]],
      contactPreference : ['email'],
      emailGroup : this.fb.group({
        email : ['',[Validators.required,CustomValidators.emailDomain('angular.com')]],
      confirmEmail : ['',Validators.required],
      },{validator: matchEmail }),/* applying validator on group */
      
       phone : [''],
      skills : this.fb.group({
        skillName : ['',Validators.required],
        experienceInYears : ['',Validators.required],
        proficiency : ['',Validators.required]
    })
  });

  /* ** this is used instead of using click event in html when the value of perticular 
  element get changevlueChanges method get called and the required content load ** */
  
  this.employeeForm.get('contactPreference').valueChanges.subscribe((data : string) => {
    this.onContactPreferenceChange(data); 
  });
  
  this.employeeForm.valueChanges.subscribe((data) => {
    this.logValidationErrors(this.employeeForm);
  });

  }

  onContactPreferenceChange(selectedValue : string) {
    const phoneControl = this.employeeForm.get('phone');
    if(selectedValue === 'phone')
    {
      phoneControl.setValidators (Validators.required);//to set multiple validators we use the array of vlidators
    }
    else{
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();  
  }

  logValidationErrors(group : FormGroup = this.employeeForm ) : void {
    Object.keys(group.controls).forEach((key : string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validationMessages[key];
         
          for( const errorkey in abstractControl.errors) {
            if (errorkey)
            {
              this.formErrors[key] += messages[errorkey] + ' ';
              
            }
          }
        }

      if(abstractControl instanceof FormGroup) {
         this.logValidationErrors(abstractControl);
      }
    });
  }
  
 
/* method to submit the data ** */
  onSubmit() : void {
    //console.log(this.employeeForm);
    
  }

  /* ** method to set the values on the form ** */
  onLoadDataClick() : void{
  
  

  /* ** creating Form Array using FormBuilder class ** */
  const formArray1 =this.fb.array([
    new FormControl('ani',Validators.required),
    new FormControl('IT',Validators.required),
    new FormControl('',Validators.required),
  ]);
  
  const formGroup =this.fb.array([
    new FormControl('ani',Validators.required),
    new FormControl('IT',Validators.required),
    new FormControl('',Validators.required),
  ]);
}
}
  /* ** this is the custom validation function for cross field checking of emails ** */

 function matchEmail(group : AbstractControl) : {[key : string] : any} | null{
   const emailControl = group.get('email');
   const confirmEmailControl = group.get('confirmEmail'); 

   if(emailControl.value === confirmEmailControl.value || confirmEmailControl.pristine){
     return null;
   }

   else{
     return {'emailMisMatch' : true};
   }
 }