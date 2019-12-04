import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './../../services/communication.service';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	login_obj = {username: "", password: ""};

	constructor(private comm: CommunicationService, private router: Router, private user: UserService) { }

	ngOnInit() {
		this.checkIfLoggedIn();
	}

	checkIfLoggedIn() {
		this.comm.sendPost('loggedIn').subscribe((res: any) => {
			console.log(res);
			this.user.logged_in = true;
			this.user.user_obj = res;
			if (res.type)
				this.router.navigate(['/issuer']);
			else
				this.router.navigate(['/user'])
		})
	}

	login() {
		console.log(this.login_obj);
		this.comm.sendPost('login', this.login_obj).subscribe((res: any) => {
			console.log(res);
			this.user.logged_in = true;
			this.user.user_obj = res;
			if (res.type)
				this.router.navigate(['/issuer']);
			else
				this.router.navigate(['/user'])
		})
	}

}
