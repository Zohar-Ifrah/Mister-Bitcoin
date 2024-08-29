import { AbstractControl } from "@angular/forms";
import { debounceTime, map, timer } from "rxjs";

export function nonEnglishLetters(control: AbstractControl) {
    const isEnglishLetters = (/^[a-zA-Z ]*$/ig).test(control.value)
    return isEnglishLetters ? null : { nonEnglishLetters: true }
}

export function nameTaken(control:AbstractControl){
    
    return timer(1000)
    .pipe(
        debounceTime(500),
        map(() => {
            if(control.value === 'bobo') return {nameTaken: true}
            return null
        })
    )
}