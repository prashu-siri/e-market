import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'e-market';

	constructor(private router: Router) {}

	isSignInPage() {
		return this.router.url.indexOf('/login') > -1;
	}
}
