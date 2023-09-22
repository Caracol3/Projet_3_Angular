import { Component, HostListener, OnInit } from '@angular/core';
import { Search } from '../models/search';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { Fields } from '../models/region-model';
import { normalizeText } from 'normalize-text';
import { AuthService } from '../service/AuthService';
import { AccountServiceService } from '../account-service.service';


@Component({
  selector: 'app-search-train',
  templateUrl: './search-train.component.html',
  styleUrls: ['./search-train.component.scss'],
})
export class SearchTrainComponent implements OnInit {
  search: Search = new Search('', '', new Date(), '');
  user: any;
  userName: string = '';
  isMobile: boolean = false;
  isDesktop: boolean = false;

  constructor(
    private authService: AuthService,
    private accountService: AccountServiceService,
    private dataService: DataService,
  ) { }



  ngOnInit(): void {
    this.getRegions();
    this.user = this.accountService.getUserData(1);

  }
  syncUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.user = this.accountService.getUserData(1);
        resolve("opération réussie");
      }
        , 1000);
    });
  }

  GareDepartSelect: boolean = false;
  GareArriverSelect: boolean = false;
  DateSelect: boolean = false;
  AllInfo: boolean = false;
  resultOfTrainSearchDepart: any = [];
  departureStation: any[] = [];
  listOfDepartureStation: string[] = [];
  arrivalStation: any[] = [];
  resultOfTrainSearchArriver: any = [];
  GareArriverSelectInfo: boolean = false;
  uicCodeDepart: string = '';
  uicCodeArriver: string = '';
  searchPage: boolean = true;
  listeTrain: boolean = false;
  listeOfTrain: any;
  showTextDesktop: boolean = true;
  dateHeureFormat: string = '';




  // recuperation des données de l'api



  onSubmit() {

    this.search.depart = this.search.depart;
    this.search.date = this.search.date;

    const dateOriginal = this.search.date.toString();
    const dateObj = new Date(dateOriginal);
    const annee = dateObj.getFullYear();
    const mois = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const jour = dateObj.getDate().toString().padStart(2, '0');
    const dateFormatee = `${annee}${mois}${jour}`;

   this.dateHeureFormat = dateFormatee + "T" + this.search.heureDepart.replace(":", "") + "00";
   this.dataService.getDataFromApi(this.uicCodeDepart, this.uicCodeArriver, this.dateHeureFormat);
   this.listeOfTrain = this.dataService.apiResponse.journeys;



  setTimeout(() => {
      this.listeOfTrain = this.dataService.apiResponse.journeys;
      console.log(this.listeOfTrain);
      this.searchPage = false;
      this.showTextDesktop = false;
      this.listeTrain = true;


    }, 300);



  }

  regions: {
    [x: string]: any;
    gare_alias_libelle_noncontraint: string;
    fields: Fields
  }[] = [];

  // appel de la fonction getRegions() au chargement de la page


  // Récupération des gares de la SNCF et code uic dans variables regions
  async getRegions() {
    this.regions = await this.dataService.getRegions();
  }


  // recherche de gare de départ par nom



  searchGareDepart() {

    this.resultOfTrainSearchDepart = [];

    if (this.search.depart !== '') {
      this.GareDepartSelect = true;
      this.search.depart = this.search.depart.toLowerCase();
      for (let i = 0; i < this.regions.length - 1; i++) {
        if (normalizeText(this.regions[i].gare_alias_libelle_noncontraint).toLowerCase().startsWith(this.search.depart) && this.regions[i]['segmentdrg_libelle'] === "a") {
          this.resultOfTrainSearchDepart.push(this.regions[i]);





        }

      }
    } else {
      this.GareDepartSelect = false;
      this.GareArriverSelect = false;
      this.departureStation = [];
    }

  }


  searchGareArriver() {


    this.resultOfTrainSearchArriver = [];
    if (this.search.arrivee !== '') {
      this.GareArriverSelectInfo = true;

      this.search.arrivee = this.search.arrivee.toLowerCase();
      for (let i = 0; i < this.regions.length - 1; i++) {
        if (normalizeText(this.regions[i].gare_alias_libelle_noncontraint).toLowerCase().startsWith(this.search.arrivee) && this.regions[i]['segmentdrg_libelle'] === "a") {
          this.resultOfTrainSearchArriver.push(this.regions[i]);



        }

      }
    } else {

      this.arrivalStation = [];
      this.GareArriverSelectInfo = false;
    }

  }



  // selection de la gare au click

  selectGareDepart(index: number) {
    this.uicCodeDepart = this.resultOfTrainSearchDepart[index].uic_code.slice(2);
    this.search.depart = this.resultOfTrainSearchDepart[index].gare_alias_libelle_noncontraint;
    this.GareDepartSelect = false;
    this.GareArriverSelect = true;
    this.resultOfTrainSearchDepart = [];

  }


  selectGareArriver(index: number) {
    this.uicCodeArriver = this.resultOfTrainSearchArriver[index].uic_code.slice(2);
    this.search.arrivee = this.resultOfTrainSearchArriver[index].gare_alias_libelle_noncontraint;
    this.resultOfTrainSearchArriver = [];
    this.GareArriverSelectInfo = false;
    this.DateSelect = true;

  }


  // affichage du bouton de recherche


  sectectHeure() {

    if (this.search.date) {
      this.AllInfo = true;
    }


  }

  getInfoTrain(index: number) {
    console.log(this.formatDateAndTime(this.listeOfTrain[index].sections[0].departure_date_time) + "  " + this.listeOfTrain[index].sections[1].display_informations.trip_short_name);
  }


  logout() {
    this.authService.logout();
  }

  formatDateAndTime(dateTimeStr: string): string {
    const year = dateTimeStr.slice(0, 4);
    const month = dateTimeStr.slice(4, 6);
    const day = dateTimeStr.slice(6, 8);
    const hour = dateTimeStr.slice(9, 11);
    const minute = dateTimeStr.slice(11, 13);

    return `${day}/${month}/${year} ${hour}:${minute}`;
  }
}

