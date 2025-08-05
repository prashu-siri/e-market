import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/interface/login';
import { UserAddress } from 'src/app/interface/UserAddress';
import { Order } from '../../interface/order';
import { AuthService } from '../../service/auth.service';
import { MarketService } from '../../service/market.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	isLoggedIn: boolean = false;
	orders: Order[] = [];
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
		const email = this.loggedInUser.email;
		this.marketService.getOrders(email).subscribe((response: any) => {
			if (response.length > 0) {
				this.orders = response;
			}
		});
	}

	changeTab(event: MouseEvent, tabName: string) {
		event.preventDefault();
		this.tab = tabName;
	}
}
