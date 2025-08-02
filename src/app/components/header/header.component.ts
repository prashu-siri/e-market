import { Component, OnInit, ViewChild } from '@angular/core';
import { MarketService } from '../../service/market.service';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	numberOfItems: number = 0;

	constructor(
		private service: MarketService,
		private authService: AuthService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {}

	@ViewChild(ModalComponent)
	modal!: ModalComponent;

	ngOnInit(): void {
		this.service.productAdded$.subscribe((response) => {
			this.numberOfItems = response.length;
		});
	}

	hasItems() {
		return this.numberOfItems > 0;
	}

	isLoggedIn() {
		return this.authService.isLoggedIn();
	}

	signOut($event: MouseEvent) {
		$event.preventDefault();
		this.authService.signOut();
		this.router.navigate(['home']);
	}

	navigateToLogin($event: MouseEvent) {
		$event.preventDefault();
		this.authService.setCurrentRoute(this.router.routerState.snapshot.url);
		this.router.navigate(['login'], { relativeTo: this.activatedRoute });
	}

	navigateToPage($event: MouseEvent) {
		$event.preventDefault();

		if (this.isLoggedIn()) {
			this.router.navigate(['profile']);
		} else {
			this.modal.openModal();
		}
	}

	getFullName() {
		const loggedInUser = this.authService.getLoggedInUser();
		return loggedInUser.firstName + ' ' + loggedInUser.lastName;
	}

	toggleMenu(event: MouseEvent) {
		event.preventDefault();
		const navMenu = document.querySelector('#nav-menu');
		navMenu?.classList.toggle('open-menu');
	}

	handleLoginSuccess($event: MouseEvent) {
		this.modal.closeModal($event);
	}
}
