/* ** this is the custom validation class in which we write
 reusable customee validation function to check the data fields ** */

 
import {AbstractControl} from '@angular/forms';
import { from } from 'rxjs';

export class CustomValidators {
     

  /* ** this custom validation function check the email domain ** */
static emailDomain(domainName : string){
    return (control:AbstractControl) : {[key : string] : any} | null => {
    const email : string = control.value;
    const domain = email.substring(email.lastIndexOf('@') + 1);
  
    if(email === '' || domain.toLowerCase() === domainName.toLowerCase() ) {
      return null;
    } 
    else{
      return { 'emailDomain' : true };
    }
  };
}
}  