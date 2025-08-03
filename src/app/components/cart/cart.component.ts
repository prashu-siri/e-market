import { Component, OnInit, computed } from '@angular/core';
import { MarketService } from '../../service/market.service';
import { Product } from '../../interface/product';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
	products = computed(() => this.service.cartProducts());

	constructor(private service: MarketService, private title: Title) {}

	ngOnInit(): void {
		this.title.setTitle('Purilo | Cart');
		this.service.setpageName('cart');
	}

	removeItem($event: MouseEvent, productDetails: Product) {
		$event.preventDefault();
		this.service.removeItemFromCart(productDetails);
	}

	addQuantity($event: MouseEvent, product: Product) {
		$event.preventDefault();
		this.service.addQuantity(product);
	}

	removeQuantity($event: MouseEvent, product: Product) {
		$event.preventDefault();
		this.service.removeQuantity(product);
	}

	getItemCost(product: Product) {
		return (product.quantity ?? 0) * product.cost;
	}

	hasProducts() {
		return this.products()?.length > 0;
	}
}
