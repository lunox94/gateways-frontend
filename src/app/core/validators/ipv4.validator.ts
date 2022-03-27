import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isIPv4 } from 'is-ip';

/** Validate that the field is an IPv4 address. */
export function ipv4(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        return !!value && !isIPv4(value) ? { ipv4: true } : null;
    };
}
