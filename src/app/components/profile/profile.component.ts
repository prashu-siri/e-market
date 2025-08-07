import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/interface/login';
import { UserOrders } from 'src/app/interface/user-orders';
import { UserAddress } from 'src/app/interface/userAddress';
import { AuthService } from '../../service/auth.service';
import { MarketService } from '../../service/market.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	isLoggedIn: boolean = false;
	userOrders!: UserOrders;
	tab: string = 'orders';
	loggedInUser: Login = {} as Login;
	userAddress: UserAddress = {} as UserAddress;

	constructor(
		private authService: AuthService,
		private marketService: MarketService
	) {}

	ngOnInit(): void {
		this.getLoggedInUser();
		this.getOrders();
		this.getAddresses();
	}

	getLoggedInUser() {
		this.loggedInUser = this.authService.getLoggedInUser();
		this.isLoggedIn = this.loggedInUser ? true : false;
		return this.loggedInUser;
	}
	getAddresses() {
		const id = this.loggedInUser.id;
		this.marketService.getAddresses(id).subscribe((response: any) => {
			this.userAddress = response[0];
		});
	}

	getOrders() {
		const id = this.loggedInUser.id;
		this.marketService.getOrders(id).subscribe((response: any) => {
			this.userOrders = response;
		});
	}

	changeTab(event: MouseEvent, tabName: string) {
		event.preventDefault();
		this.tab = tabName;
	}

	openModal(event: MouseEvent) {
		if (event) {
			event.preventDefault();
		}

		document.querySelector('#modal-address')?.classList.add('open');
	}

	closeModal(event: MouseEvent) {
		if (event) {
			event.preventDefault();
		}

		document.querySelector('#modal-address')?.classList.remove('open');
	}
}
