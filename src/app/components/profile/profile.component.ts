import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { MarketService } from '../../service/market.service';
import { Order } from '../../interface/order';
import { Login } from 'src/app/interface/login';
import { Product } from 'src/app/interface/product';

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

	constructor(
		private authService: AuthService,
		private marketService: MarketService
	) {}

	ngOnInit(): void {
		this.isLoggedIn = this.authService.isLoggedIn();
		this.getOrders();
		this.loggedInUser = this.authService.getLoggedInUser();
	}

	getOrders() {
		const email = this.authService.getLoggedInUser().email;
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

	calculateTotalCost(products: Product[]) {
		let totalCost = 0;
		products.forEach((product: Product) => {
			totalCost = totalCost + (product.quantity ?? 0) * product.cost;
		});

		return totalCost;
	}

	getStatusClass(status: string) {
		return status.toLowerCase() == 'delivered'
			? 'status-success'
			: 'status-pending';
	}
}
