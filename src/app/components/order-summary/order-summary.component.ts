import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interface/product';
import { MarketService } from '../../service/market.service';

@Component({
	selector: 'app-order-summary',
	templateUrl: './order-summary.component.html',
	styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
	// @Input()
	products: Product[] = [];

	@Input()
	pageName: string = 'cart';
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

	constructor(private service: MarketService) {}

	ngOnInit(): void {
		const products = this.service.getProducts();
		this.products = products ? JSON.parse(products) : [];
		this.service.pageName$.subscribe(
			(pageName) => (this.pageName = pageName)
		);

		this.service.productAdded$.subscribe((products) => {
			this.discount = 0;
			this.products = products;
		});
	}

	calculateSubTotal(): number {
		this.totalCost = 0;

		this.products.forEach((product) => {
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
		if (this.pageName == 'cart') {
			this.pageName = 'shipping';
			this.service.setpageName('shipping');
		} else {
			this.pageName = 'payment';
			this.service.setpageName('payment');
		}
	}
}
