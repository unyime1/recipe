import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdownDirective]'
})
export class DropdownDirectiveDirective {
  //dynamically bind the class of open to an element
  @HostBinding('class.open') isOpen = false; 

  @HostListener('click') toggleOpen() {
    //listen to click event and revert the value of isOpen
    this.isOpen = !this.isOpen; 
  }
  constructor() { }

}
