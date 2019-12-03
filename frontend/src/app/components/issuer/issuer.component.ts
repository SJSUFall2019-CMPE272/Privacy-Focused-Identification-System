import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-issuer',
  templateUrl: './issuer.component.html',
  styleUrls: ['./issuer.component.scss']
})
export class IssuerComponent implements OnInit {

	new_schema_attributes = [];
	schema_name = "";

	constructor() { }

	ngOnInit() {
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
	}

}
