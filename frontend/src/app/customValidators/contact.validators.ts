import { AbstractControl, ValidationErrors } from "@angular/forms";
import { debounceTime, map, Observable, switchMap, take, timer } from "rxjs";
import { ContactService } from "../services/async-contact.service";
import { inject } from "@angular/core";

export function nonEnglishLetters(control: AbstractControl) {
    const isEnglishLetters = (/^[a-zA-Z ]*$/ig).test(control.value)
    return isEnglishLetters ? null : { nonEnglishLetters: true }
}

export function emailTaken(contactService: ContactService) {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return timer(0).pipe(
            switchMap(() => contactService.getContacts()), 
            map(contacts => {
                const emails = contacts.map(contact => contact.email);
                return emails.includes(control.value) ? { emailTaken: true } : null;
            }),
            take(1)
        );
    };
}


export function nameTaken(control: AbstractControl) {

    return timer(0)
        .pipe(
            debounceTime(500),
            map(() => {
                if (control.value === 'bobo') return { nameTaken: true }
                return null
            })
        )
}