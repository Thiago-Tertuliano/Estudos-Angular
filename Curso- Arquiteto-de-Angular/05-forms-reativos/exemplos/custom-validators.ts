import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  AsyncValidatorFn,
} from '@angular/forms';
import { Observable, of, delay, map } from 'rxjs';

export function maxAmount(max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = Number(control.value);
    if (Number.isNaN(value)) return null;
    return value > max ? { maxAmount: { max, actual: value } } : null;
  };
}

export function uniqueDescriptionValidator(
  checkFn: (desc: string) => Observable<boolean>
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value = (control.value as string)?.trim();
    if (!value) return of(null);

    return checkFn(value).pipe(
      delay(300), // debounce simulado
      map((isUnique) => (isUnique ? null : { duplicateDescription: true }))
    );
  };
}
