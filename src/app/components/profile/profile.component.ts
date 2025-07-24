import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { MarketService } from '../../service/market.service';
import { Order } from '../../interface/order';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	isLoggedIn: boolean = false;
	orders: Order[] = [];

	constructor(
		private authService: AuthService,
		private marketService: MarketService
	) {}

	ngOnInit(): void {
		this.isLoggedIn = this.authService.isLoggedIn();
		this.getOrders();
	}

	getOrders() {
		const email = this.authService.getLoggedInUser().email;
		this.marketService.getOrders(email).subscribe((response: any) => {
			if (response.length > 0) {
				this.orders = response;
			}
		});
	}
}
