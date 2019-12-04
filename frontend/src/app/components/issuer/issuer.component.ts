import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './../../services/communication.service';
import { ChangeDetectorRef } from '@angular/core';

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

	constructor(private comm: CommunicationService, private cdr: ChangeDetectorRef) { }

	ngOnInit() {
		this.getSchemas();
	}

	getSchemas() {
		this.comm.get('issuer/schemaAttributes').subscribe((res) => {
			console.log(res);
			this.schemas = res;
			this.selected_schema = res[0];
		})
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
		console.log(ev.target.value);
		for (let i=0; i<this.schemas.length; i++) {
			if (this.schemas[i].schema_id == ev.target.value) {
				this.selected_schema = this.schemas[i];
				this.cdr.detectChanges();
				break;
			}
		}
	}

	issueCredential(ev) {
		let form_data = new FormData(ev.target);
		console.log(form_data);
	}

}
