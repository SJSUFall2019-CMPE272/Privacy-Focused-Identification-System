import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	login_obj = {email: "", password: ""};

	constructor() { }

	ngOnInit() {
	}

	login() {
		console.log(this.login_obj);
	}

}
