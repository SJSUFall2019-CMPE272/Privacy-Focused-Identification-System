import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private user: UserService) { }

  canActivate(route: ActivatedRouteSnapshot) {
  	if (!this.user.logged_in) {
  		this.router.navigate(['/login']);
  		return false;
  	}
  	return true;
  }
}
