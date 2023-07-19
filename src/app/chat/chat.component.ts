import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Fields } from './region-model';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {


  regions :{
    fields : Fields
  }[] = [];

  constructor(private dataService : DataService) { }

  ngOnInit(): void {
    this.getRegions();
  }


  async getRegions() {
    this.regions = await this.dataService.getRegions();
    console.log(this.regions);
  }



}
