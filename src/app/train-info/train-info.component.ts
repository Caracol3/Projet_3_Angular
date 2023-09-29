import { Component, HostListener, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { DataService } from '../data.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-train-info',
  templateUrl: './train-info.component.html',
  styleUrls: ['./train-info.component.scss']
})
export class TrainInfoComponent implements OnInit {


  constructor(private location: Location, private  dataService :DataService, private http : HttpClient ) { }
  retard : any = {};
  journey: any = localStorage.getItem("urlRetard");




  ngOnInit() {
   this.getDataFromDelay()
  }


  getDataFromDelay() {
    const url  = `https://api.sncf.com/v1/coverage/sncf/vehicle_journeys/${this.journey}`;
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('c286f422-1bc0-4034-a50e-6a6da457215a' + ':' + "")
    });
      this.http.get(url, {headers}).subscribe((response : any) => {
        this.retard = response;
        console.log(url)
        console.log(this.retard)


    });
  return this.retard
  }

  formatTime(inputTime: string): string {
    if (inputTime.length === 6) {
      const hours = inputTime.slice(0, 2);
      const minutes = inputTime.slice(2, 4);
      return `${hours}h${minutes}`;
    }
    return inputTime;
  }


  returnSalon() {
    this.location.back();
  }
}
