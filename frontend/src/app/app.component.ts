import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { CommunicationService } from './services/communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  constructor(public user: UserService, private router: Router, private comm: CommunicationService) {}

  logout() {
  	this.comm.get('logout').subscribe(() => {
  		this.user.logged_in = false;
  		this.router.navigate(['/login']);
  	});
  }
}
