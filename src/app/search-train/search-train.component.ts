import { Component } from '@angular/core';
import { Search } from '../models/search';


@Component({
  selector: 'app-search-train',
  templateUrl: './search-train.component.html',
  styleUrls: ['./search-train.component.scss']
})
export class SearchTrainComponent {
  search: Search = new Search('', '', new Date(), '');


onSubmit() {
  this.search.depart = this.search.depart;

  console.log(this.search.depart +' '+ this.search.arrivee +' '+ this.search.date +' '+ this.search.heureDepart);


}
}
