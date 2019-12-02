import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	register_obj = {name: "", email: "", password: ""};

	constructor() { }

	ngOnInit() {
	}

	register() {
		console.log(this.register_obj);
	}

}
