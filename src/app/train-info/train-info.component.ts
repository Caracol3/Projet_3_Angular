import { Component, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-train-info',
  templateUrl: './train-info.component.html',
  styleUrls: ['./train-info.component.scss']
})
export class TrainInfoComponent {

  private previousScrollX = 0;

  constructor(private location: Location) { }

  @HostListener('window.scroll', ['$event'])
  onScroll(event: Event) {
    const currentScrollX = window.scrollX;

    
    if (currentScrollX > this.previousScrollX) {
      this.returnSalon();
    }

    this.previousScrollX = currentScrollX;
  }

  returnSalon() {
    this.location.back();
  }
}
