import { Directive, ElementRef, HostListener, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[activeField]'
})

export class ActiveFieldDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {}

  @HostListener('keyup') keyUp() {
    if (this.elementRef.nativeElement.value == '') {
      this.renderer.removeClass(this.elementRef.nativeElement.previousSibling, 'active');
      this.renderer.removeClass(this.elementRef.nativeElement.previousSibling, 'highlight');
    }

    else {
      this.renderer.addClass(this.elementRef.nativeElement.previousSibling, 'active');
      this.renderer.addClass(this.elementRef.nativeElement.previousSibling, 'highlight');
    }

  };
}
