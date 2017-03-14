import { Component, OnInit } from '@angular/core';


@Component({
	selector: 'my-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
	private todoList: string = '';
	constructor() {
		// Do stuff

	}

	ngOnInit() {
		console.log('Hello About');
	}
	addItem() {

	}
}
