import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[showOnMoblie]'
})
export class ShowOnMoblieDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.checkScreenSize(); // בדיקה ראשונית בעת טעינת הדף
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize(); // בדיקה בכל פעם שמשנים גודל חלון
  }

  private checkScreenSize() {
    if (window.innerWidth <= 640) {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'block'); // הצגת האלמנט במסכים קטנים
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none'); // הסתרת האלמנט במסכים גדולים
    }
  }

}
