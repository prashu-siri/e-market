import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-icon',
	templateUrl: './icon.component.html',
})
export class IconComponent {
	@Input() name!: string;
	version: number = 0;

	constructor() {
		this.version = Date.now();
	}
}
