import { Component, computed, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { MarketService } from '../../service/market.service';

@Component({
	selector: 'app-order-summary',
	templateUrl: './order-summary.component.html',
	styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
	pageName = computed(() => this.service.pageName());
	totalCost: number = 0;
	discount: number = 0;
	isInvalidCoupon: boolean = false;
	availableCoupons: any[] = [
		{
			code: 'FRESH50',
			minValue: 200,
			discAmount: 50,
		},
		{
			code: 'FRESH100',
			minValue: 500,
			discAmount: 100,
		},
	];
	couponCode: string = '';
	isLoggedIn: boolean = false;

	products = computed(() => this.service.cartProducts());

	constructor(
		private service: MarketService,
		private authService: AuthService
	) {}

	ngOnInit(): void {}

	isUserLoggedIn() {
		return this.authService.isLoggedIn();
	}

	calculateSubTotal(): number {
		this.totalCost = 0;

		this.products().forEach((product) => {
			this.totalCost =
				this.totalCost + product.cost * (product.quantity ?? 0);
		});

		return this.totalCost;
	}

	calculateTotalCost(): number {
		return this.totalCost - this.discount;
	}

	validateCoupon() {
		const validCoupon = this.availableCoupons.find((coupon) => {
			return (
				coupon.code === this.couponCode.toUpperCase() &&
				this.calculateSubTotal() >= coupon.minValue
			);
		});
		if (validCoupon) {
			this.discount = validCoupon.discAmount;
			this.couponCode = '';
			this.isInvalidCoupon = false;
		} else {
			this.isInvalidCoupon = true;
		}
	}

	navigateTonextpage() {
		if (this.pageName() == 'cart') {
			this.service.setpageName('shipping');
		} else {
			this.service.setpageName('payment');
		}
	}
}
