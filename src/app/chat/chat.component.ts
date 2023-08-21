import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Fields } from './region-model';
import { normalizeText } from 'normalize-text';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {


  departureStation : any[] = [];
  listOfDepartureStation : string[] = [];
  arrivalStation : any[] = [];
  listOfArrivalStation : string[] = [];
  arrivalStationName : string = '';
  searchGareDeparture : string = '';
 resultOfTrainSearch : any;
 resultOfTrainSearchArival : any;
 selectDepart : boolean = false;
 selectArrival : boolean = false;
 tokenSncf : string = "c286f422-1bc0-4034-a50e-6a6da457215a"
 tokenNavia : string = "5a68c47b-e035-436e-b008-6fccc8427b38"


  regions :{
    gare_alias_libelle_noncontraint: string;
    fields : Fields
  }[] = [];

  constructor(private dataService : DataService , private http : HttpClient ) { }

// appel de la fonction getRegions() au chargement de la page

  ngOnInit(): void {
    this.getRegions();
  }

  // Récupération des gares de la SNCF et code uic dans variables regions

  async getRegions() {
    this.regions = await this.dataService.getRegions();
  }

 // recherche de gare de départ par nom 

 

  searchGare() {

   
    if(this.searchGareDeparture !== '') {  
      this.resultOfTrainSearch = []; 
    this.searchGareDeparture = this.searchGareDeparture.toLowerCase();
    for (let i = 0; i < this.regions.length-1; i++) {
      if (normalizeText(this.regions[i].gare_alias_libelle_noncontraint).toLowerCase().startsWith(this.searchGareDeparture)) {
        this.resultOfTrainSearch.push(this.regions[i]);
       
      
        }
    
    }
    }   else {
       
      this.departureStation = [];
    }

  }




  searchGareA() {


    if(this.arrivalStationName !== '') {
      this.resultOfTrainSearchArival = [];
    this.arrivalStationName = this.arrivalStationName.toLowerCase();
    for (let i = 0; i < this.regions.length-1; i++) {
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





selectGareArival(index : number){
  this.arrivalStation = [];
  this.arrivalStation.push(this.resultOfTrainSearchArival[index]);
  this.arrivalStationName = this.resultOfTrainSearchArival[index].gare_alias_libelle_noncontraint;
  this.resultOfTrainSearchArival = [];
  this.selectArrival = true;
}


selectGareDepart(index : number) {
  this.departureStation = [];
  this.departureStation.push(this.resultOfTrainSearch[index]);
  this.searchGareDeparture = this.resultOfTrainSearch[index].gare_alias_libelle_noncontraint;
  this.resultOfTrainSearch = [];
  this.selectDepart = true;
}







getDataFromApi() {
  
  const url  = `https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area:SNCF:${this.departureStation[0].uic_code.slice(2)}&to=stop_area:SNCF:${this.arrivalStation[0].uic_code.slice(2)}`;
  const headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa('c286f422-1bc0-4034-a50e-6a6da457215a' + ':' + "")
  });
  
     

  return this.http.get(url, {headers}).subscribe((response : any) => {
    console.log(url);
    console.log(response);
  });


}










/*



async searchTrainRoute(): Promise<any> {
  console.log(this.departureStation[0].uic_code.slice(2) , this.arrivalStation[0].uic_code.slice(2));
  const reponse = await fetch(`https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area:SNCF:${this.departureStation[0].uic_code.slice(2)}&to=stop_area:SNCF:${this.arrivalStation[0].uic_code.slice(2)}`, {
    method: 'GET',
    headers: new Headers({
      'Authorization': `User ${this.tokenNavia}`
    }),
  });
  const itineraireData : {} = await reponse.json();
  console.log(itineraireData);
  return itineraireData;
}

*/

/*
searchTrainRoute() {

    // Spécifiez les en-têtes avec l'identifiant utilisateur
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `User ${this.tokenSncf}`
      })
    };

    this.http.get(`https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area:SNCF:${this.departureStation[0].uic_code.slice(2)}&to=stop_area:SNCF:${this.arrivalStation[0].uic_code.slice(2)}`, httpOptions).subscribe(
      (response) => {
        console.log('Réponse de l\'API : ', response);
      },
      (error) => {
        console.error('Erreur lors de l\'appel API : ', error);
      }
    );
  }

*/


}






