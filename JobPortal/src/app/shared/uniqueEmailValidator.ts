import { AbstractControl } from '@angular/forms';
import { EmailService } from '../email.service';
import { map } from 'rxjs/operators';

export class ValidateEmailNotTaken {
  static createValidator(customerService: EmailService) {
    return (control: AbstractControl) => {
      return customerService.checkEmailNotTaken(control.value).pipe(map(res => {
       // return res.emailNotTaken ? null : {emailTaken: true};
      }));
    }
  }
}