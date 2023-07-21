import { Injectable } from '@angular/core';
import { Fields } from './chat/region-model';
import { normalizeText } from 'normalize-text';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }


  

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
      }
    });
  }


}


