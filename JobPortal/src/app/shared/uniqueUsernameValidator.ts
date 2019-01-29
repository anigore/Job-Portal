import { AbstractControl } from '@angular/forms';
import { EmailService } from '../email.service';
import { map } from 'rxjs/operators';

export class ValidateUsernameNotTaken {
  static createValidator(customerService: EmailService, customerId: string) {
    return (control: AbstractControl) => {
      return customerService.checkEmailNotTaken(control.value).pipe(map(res => {
      }));
    }
  }
}