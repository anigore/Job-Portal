/* ** this is the custom validation class in which we write
 reusable custome validation function to check the data fields ** */

 
 import {AbstractControl} from '@angular/forms';
 import { from } from 'rxjs';
 
 export class CustomValidation {
      
 
   /* ** this custom validation function check the username pattern ** */
 static usernameFieldValidator(){
     return (control:AbstractControl) : {[key : string] : any} | null => {
     const username : string = control.value;
     
     if(username === '' || username.toLowerCase() && username.match(/^[a-z]*$/)) {
       return null;
     } 
     else{
       return { 'usernameField' : true };
     }
   };
 }

   /* ** this custom validation function check the password pattern ** */
   static passwordFieldValidator(){
    return (control:AbstractControl) : {[key : string] : any} | null => {
    const password : string = control.value;
    
    if(password === '' || (password.match(/^[A-Za-z](?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,8}$/))) {
      return null;
    } 
    else{
      return { 'usernameField' : true };
    }
  };
}

static uniqueUsername(){
  return (control:AbstractControl) : {[key : string] : any} | null => {
  const username : string = control.value;
  
  if(username === '' || username.toLowerCase() && username.match(/^[a-z]*$/)) {
    return null;
  } 
  else{
    return { 'usernameField' : true };
  }
};
}

 }  