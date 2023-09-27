import { Component,ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
isMenuOpen: boolean = false;


  constructor(private router: Router , ) { }
  


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isRouteLoginOpen(): boolean {
    return this.router.url === '/login' || this.router.url === '/signin';
  }


}

