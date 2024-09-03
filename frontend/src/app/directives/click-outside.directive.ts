import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, inject, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {

  @Output() clickOutside = new EventEmitter()
  hostEl = inject(ElementRef)

  @HostListener('document:mousedown', ['$event'])
  onClick(ev: MouseEvent) {
    const isClickOutside = !this.hostEl.nativeElement.contains(ev.target)
    if (isClickOutside) this.clickOutside.emit()
  }

  @HostBinding('class')
  class = 'click-outside'

}
