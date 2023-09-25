import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projet3';

constructor(private router:Router) {}

isRouteChatOpen(): boolean {
  return this.router.url === '/chat';
}
}
