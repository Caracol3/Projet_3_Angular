import { Component,ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
isMenuOpen: boolean = false;

@ViewChild('menu') menu: ElementRef | undefined;

  constructor(private router: Router) {
    // Vérifie la route active pour cacher le menu sur les pages "login" ou "sign-in"
    // this.router.events.subscribe(() => {
    //   if (this.router.url === '/login' || this.router.url === '/sign-in') {
    //     this.showMenu = false;
    //   } else {
    //     this.showMenu = true;
    //   }
    // });
  }


  toggleMenu() {
    // this.isMenuOpen = !this.isMenuOpen;
    this.isMenuOpen = true;
    console.log("toggleMenu :" + this.isMenuOpen);
  }

  closeMenu() {
    this.isMenuOpen = false;
    console.log( "closeMenu " + this.isMenuOpen);
  }
}
