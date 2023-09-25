import { Component, HostListener, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-train-info',
  templateUrl: './train-info.component.html',
  styleUrls: ['./train-info.component.scss']
})
export class TrainInfoComponent implements OnInit {

  private previousScrollX = 0;

  constructor(private location: Location, private  dataService :DataService) { }
  retard : any ;
  infoTrain : any;



  ngOnInit() {
    let urlTrain : any = localStorage.getItem("urlTrain");
    let urlRetard : any = localStorage.getItem("urlRetard");
    this.dataService.getDataFromDelay(urlRetard);
    this.dataService.getDataFromTrain(urlTrain);
    setTimeout(() => {
      this.infoTrain = this.dataService.infoTrain;
      this.retard = this.dataService.retard

      // console.log(this.retard);
      console.log(this.infoTrain);
    }, 1000);

  }






  returnSalon() {
    this.location.back();
  }
}
