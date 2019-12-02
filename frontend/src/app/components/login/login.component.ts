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
	}

	login() {
		console.log(this.login_obj);
		this.comm.sendPost('login', this.login_obj).subscribe((res) => {
			console.log(res);
			this.user.logged_in = true;
			this.user.user_obj = res;
			this.router.navigate(['/']);
		})
	}

}
