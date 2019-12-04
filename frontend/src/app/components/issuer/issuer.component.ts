import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './../../services/communication.service';

@Component({
  selector: 'app-issuer',
  templateUrl: './issuer.component.html',
  styleUrls: ['./issuer.component.scss']
})
export class IssuerComponent implements OnInit {

	new_schema_attributes = [];
	schema_name = "";
	schemas:any = [];
	selected_schema:any = {};
	users = [];

	constructor(private comm: CommunicationService) { }

	ngOnInit() {
		this.getSchemas();
		this.getUsers();
	}

	getSchemas() {
		this.comm.get('issuer/schemaAttributes').subscribe((res: any) => {
			console.log(res);
			res.forEach((schema) => {
				let updated_attributes = [];
				schema.attributes.forEach((attribute) => {
					updated_attributes.push({
						name: attribute,
						value: ""
					});
				});
				schema.attributes = updated_attributes;
			});
			this.schemas = res;
			this.selected_schema = res[0];
		})
	}

	getUsers() {
		this.comm.get('user/getalluser').subscribe((users: any) => {
			this.users = users.data;
			console.log(this.users);
		});
	}

	add_attribute(attribute) {
		if (attribute && !this.new_schema_attributes.includes(attribute))
			this.new_schema_attributes.push(attribute);
	}

	remove_attribute(index) {
		this.new_schema_attributes.splice(index, 1);
	}

	create_schema() {
		let schema_obj = {
			attributes: JSON.stringify(this.new_schema_attributes),
			schema_name: this.schema_name
		}
		console.log(schema_obj);
		this.comm.sendPost("issuer/schema", schema_obj).subscribe((res) => {
			console.log(res);
		});
	}

	updateSelectedSchema(ev) {
		for (let i=0; i<this.schemas.length; i++) {
			if (this.schemas[i].schema_id == ev.target.value) {
				this.selected_schema = this.schemas[i];
				break;
			}
		}
	}

	issueCredential() {
		let req_data = {
			credential_definition_id: this.selected_schema.schema_id,
			attributes: JSON.stringify(this.selected_schema.attributes)
		}
		console.log(req_data);
	}

}
