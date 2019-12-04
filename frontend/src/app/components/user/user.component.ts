import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './../../services/communication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

	credentials: any = [];

	constructor(private comm: CommunicationService) { }

	ngOnInit() {
		this.getUserCredentials();
	}

	getUserCredentials() {
		this.comm.sendPost('user/getcred').subscribe((credentials: any) => {
			this.credentials = credentials.data;
			console.log(this.credentials);
		})
	}

	generateProof(options, referent) {
		let selected_attributes = [];
		options.forEach(option => {
			selected_attributes.push(option.value);
		})
		let req_obj = {
			attrs: selected_attributes,
			referent: referent
		}
		this.comm.sendPost('user/getencrypt', req_obj).subscribe((res) => {
			console.log(res);
		})
	}

}
