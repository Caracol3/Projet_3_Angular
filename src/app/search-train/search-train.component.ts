import { Component, OnInit } from '@angular/core';
import { Search } from '../models/search';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { Fields } from '../models/region-model';
import { normalizeText } from 'normalize-text';


@Component({
  selector: 'app-search-train',
  templateUrl: './search-train.component.html',
  styleUrls: ['./search-train.component.scss']
})
export class SearchTrainComponent implements OnInit {
  search: Search = new Search('', '', new Date(), '');
  GareDepartSelect : boolean = true;
  GareArriverSelect : boolean = false;
  DateSelect : boolean = false;
  AllInfo : boolean = false;
  resultOfTrainSearchDepart : any = [];
  departureStation : any[] = [];
  listOfDepartureStation : string[] = [];
  arrivalStation : any[] = [];
  resultOfTrainSearchArriver : any = [];
  

onSubmit() {
  this.search.depart = this.search.depart;

  console.log(this.search.depart +' '+ this.search.arrivee +' '+ this.search.date +' '+ this.search.heureDepart);


}

constructor(private dataService : DataService , private http : HttpClient ) { }

  regions :{
    gare_alias_libelle_noncontraint: string;
    fields : Fields
  }[] = [];

  // appel de la fonction getRegions() au chargement de la page
  ngOnInit(): void {
    this.getRegions();
  }

  // Récupération des gares de la SNCF et code uic dans variables regions
  async getRegions() {
    this.regions = await this.dataService.getRegions();
  }


  // recherche de gare de départ par nom 

 

  searchGareDepart() {

   this.resultOfTrainSearchDepart = [];
  
    if(this.search.depart !== '') {  
     
    this.search.depart = this.search.depart.toLowerCase();
    for (let i = 0; i < this.regions.length-1; i++) {
      if (normalizeText(this.regions[i].gare_alias_libelle_noncontraint).toLowerCase().startsWith(this.search.depart)) {
        this.resultOfTrainSearchDepart.push(this.regions[i]);
        
       
      
        }
    
    }
    }   else {
      this.GareDepartSelect = true;
      this.GareArriverSelect = false;
      this.departureStation = [];
    }

  }


  searchGareArriver() {

    
     if(this.search.arrivee !== '') {  
      
      this.search.arrivee = this.search.arrivee.toLowerCase();
     for (let i = 0; i < this.regions.length-1; i++) {
       if (normalizeText(this.regions[i].gare_alias_libelle_noncontraint).toLowerCase().startsWith(this.search.arrivee)) {
         this.resultOfTrainSearchArriver.push(this.regions[i]);
        
       
         }
     
     }
     }   else {
        
       this.arrivalStation = [];
     }
 
   }



   // selection de la gare au click

   selectGareDepart(index : number){
    this.search.depart = this.resultOfTrainSearchDepart[index].gare_alias_libelle_noncontraint;
    console.log(this.resultOfTrainSearchDepart[index])
    this.GareDepartSelect = false;
    this.GareArriverSelect = true;
    this.resultOfTrainSearchDepart = [];

    
   }

}


