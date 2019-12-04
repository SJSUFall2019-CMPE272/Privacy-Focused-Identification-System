import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './../../services/communication.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

	credentials: any = [];

	constructor(private comm: CommunicationService, private dialog: MatDialog) { }

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
		this.comm.sendPost('user/getencrypt', req_obj).subscribe((res: any) => {
			const dialogRef = this.dialog.open(DialogComponent, {
				width: "600px",
				data: {
					title: "Proof", 
					content: `Please present the following proof:<br><br><span class="break-word">${res.data}</span>`
				}
			});
		})
	}

}
