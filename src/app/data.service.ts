import { Injectable } from '@angular/core';
import { Fields } from './models/region-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiResponse: any;
  retard: any;
  urlApi : string = "";
  infoTrain : any;
  journey : any = "";
  serveUrl : string = "http://193.203.169.227:8080";
  // serveUrl : string = "http://localhost:8080";

  constructor( private http : HttpClient) { }


  // Récupération des gares de la SNCF et code uic

  public async getRegions(): Promise<any> {
    const reponse = await fetch("https://ressources.data.sncf.com/api/records/1.0/search/?dataset=referentiel-gares-voyageurs&q=&rows=3500");
    const regionsData : {
      records : {
        fields : Fields
      }[]
    } = await reponse.json();
    return regionsData.records.map(obj => {
      return {
        gare_alias_libelle_noncontraint : obj.fields.gare_alias_libelle_noncontraint,
        commune_libellemin : obj.fields.commune_libellemin,
        uic_code : obj.fields.uic_code,
        adresse_cp : obj.fields.adresse_cp,
        segmentdrg_libelle : obj.fields.segmentdrg_libelle,
      }
    });
  }



  // Récupération des trains

  getDataFromApi(uicDepart : string , uicArriver : string , dateHeureFormat : string) {


    const url  = `https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area%3ASNCF%3A${uicDepart}&to=stop_area%3ASNCF%3A${uicArriver}&datetime=${dateHeureFormat}&datetime_represents=departure`;
                  ``
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('c286f422-1bc0-4034-a50e-6a6da457215a' + ':' + "")
    });
      this.http.get(url, {headers}).subscribe((response : any) => {
        this.apiResponse = response;
        console.log(url);

    });
    return this.apiResponse;
  }
 
  getUrl(urlRetard : any){

    localStorage.removeItem('urlRetard')
    localStorage.setItem("urlRetard", urlRetard)
    this.journey = localStorage.getItem("urlRetard");
  }



}
