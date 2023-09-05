import { Component, OnInit } from '@angular/core';
import { Search } from '../models/search';
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

  constructor(
    private authService: AuthService,
    private accountService: AccountServiceService
  ) {}

  ngOnInit(): void {
    this.user = this.accountService.getUserData(1);
    console.log(
      'console du OnInit de search-train.ts : ' +
        this.accountService.getUserData(1)
    );
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

  // async syncUser() {
  //   try {
  //     const result = await this.accountService.getUserData(1);
  //     console.log(result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  //   ngOnInit(): void { setTimeout(() => {
  //     this.user = this.accountService.user;
  //   console.log(this.user);
  //   this.userName = this.user.firstName;
  //           console.log("Code exécuté après un délai de 2 secondes."); }, 700);  }
  // // ngOnInit() {
  // //   this.user = this.accountService.user;
  // //   console.log(this.user);
  // //   this.userName = this.user.firstName;
  // // }}

  onSubmit() {
    this.search.depart = this.search.depart;

    console.log(
      this.search.depart +
        ' ' +
        this.search.arrivee +
        ' ' +
        this.search.date +
        ' ' +
        this.search.heureDepart
    );
  }
  logout() {
    this.authService.logout();
  }
}
