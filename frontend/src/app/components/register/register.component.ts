import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './../../services/communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	register_obj = {name: "", email: "", password: "", is_issuer: 0};

	constructor(private comm: CommunicationService, private router: Router) { }

	ngOnInit() {
	}

	register() {
		console.log(this.register_obj);
		this.comm.sendPost("signup", this.register_obj).subscribe((res) => {
			console.log(res);
			this.router.navigate(['/login']);
		});
	}

}
