import { Component, HostListener, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-train-info',
  templateUrl: './train-info.component.html',
  styleUrls: ['./train-info.component.scss']
})
export class TrainInfoComponent implements OnInit {
  retard : any ;
  infoTrain : any;

  private previousScrollX = 0;

  constructor(private location: Location, private  dataservice :DataService) { }


  ngOnInit(): void {
    setTimeout(() => {
      this.infoTrain = this.dataservice.apiResponse.journeys;
      this.retard = this.dataservice.retard.disruptions;
      console.log(this.retard )
      console.log(this.infoTrain)
    }, 1500);

  }

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
