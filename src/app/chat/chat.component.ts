import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Fields } from './region-model';
import { normalizeText } from 'normalize-text';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {


arrivalStationName : string = '';
 
  regions :{
    gare_alias_libelle_noncontraint: string;
    fields : Fields
  }[] = [];

  constructor(private dataService : DataService) { }

// appel de la fonction getRegions() au chargement de la page

  ngOnInit(): void {
    this.getRegions();
  }

  // Récupération des gares de la SNCF et code uic dans variables regions

  async getRegions() {
    this.regions = await this.dataService.getRegions();
  }

 // recherche de gare de départ par nom 

 searchGareDeparture : string = '';
 resultOfTrainSearch : any;
 resultOfTrainSearchArival : any;

  searchGare() {

   
    if(this.searchGareDeparture !== '') {  
      this.resultOfTrainSearch = []; 
    this.searchGareDeparture = this.searchGareDeparture.toLowerCase();
    for (let i = 0; i < 3132; i++) {
      if (normalizeText(this.regions[i].gare_alias_libelle_noncontraint).toLowerCase().startsWith(this.searchGareDeparture)) {
        this.resultOfTrainSearch.push(this.regions[i]);
       
      
        }
    
    }
    }   else {
       
      this.departureStation = [];
    }
console.log(this.resultOfTrainSearch);
  }




  searchGareA() {


    if(this.arrivalStationName !== '') {
      this.resultOfTrainSearchArival = [];
    this.arrivalStationName = this.arrivalStationName.toLowerCase();
    for (let i = 0; i < 3133; i++) {
      if (normalizeText(this.regions[i].gare_alias_libelle_noncontraint).toLowerCase().startsWith(this.arrivalStationName)) {
        this.resultOfTrainSearchArival.push(this.regions[i]);
        
        
      }
  
    }
    
  } else {
    
    this.arrivalStation = [];
  }
  


  }





  // effacé le champs de recherche et revenir a 0

  returnToSearchDepart() {
    this.searchGareDeparture = '';
    this.resultOfTrainSearch = [];
   
  }

  returnToSearchArrival() {
    this.arrivalStationName = '';
    this.resultOfTrainSearchArival = [];
  }



// selection de la gare de départ ou d'arrivé au click

departureStation : any[] = [];
listOfDepartureStation : string[] = [];
arrivalStation : any[] = [];
listOfArrivalStation : string[] = [];



selectGareArival(index : number){
  this.arrivalStation = [];
  this.arrivalStation.push(this.resultOfTrainSearchArival[index]);
  this.arrivalStationName = this.resultOfTrainSearchArival[index].gare_alias_libelle_noncontraint;
  this.resultOfTrainSearchArival = [];
}


selectGareDepart(index : number) {
  this.departureStation = [];
  this.departureStation.push(this.resultOfTrainSearch[index]);
  this.searchGareDeparture = this.resultOfTrainSearch[index].gare_alias_libelle_noncontraint;
  this.resultOfTrainSearch = [];
  console.log(this.departureStation);
}


}
