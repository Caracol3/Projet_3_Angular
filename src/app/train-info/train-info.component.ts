import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-train-info',
  templateUrl: './train-info.component.html',
  styleUrls: ['./train-info.component.scss']
})
export class TrainInfoComponent {


  constructor(private location: Location) { }

  returnSalon() {
    this.location.back();
  }
}
