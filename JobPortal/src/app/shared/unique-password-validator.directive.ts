import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appUniquePasswordValidator]',
  providers:[{
    provide: NG_VALIDATORS,
    useExisting:UniquePasswordValidatorDirective,
    multi:true
  }]

})
export class UniquePasswordValidatorDirective implements Validator {
  @Input() appUniquePasswordValidator : string
  validate(control : AbstractControl): {[key : string] : any} | null{
    const controlToCompare = control.parent.get(this.appUniquePasswordValidator);
    if(controlToCompare && controlToCompare.value !== control.value && !(control.value === '')){
      return{'notEqual': true}
    }
    else{
      return null;
    }
  }

  constructor() { }

}
