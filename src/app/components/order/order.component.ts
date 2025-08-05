import { Component, Input } from '@angular/core';
import { Order } from 'src/app/interface/order';
import { Product } from 'src/app/interface/product';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrl: './order.component.scss',
})
export class OrderComponent {
	constructor() {}

	@Input()
	orders!: Order[];

	selectedOrder: Order = {} as Order;

	convertDate(date: string): string | number | Date {
    if(date) {
      return new Date(date);
    }

    return '';
	}

	getStatusClass(status: string) {
		return status?.toLowerCase() == 'delivered'
			? 'status-success'
			: 'status-pending';
	}

	calculateTotalCost(products: Product[]) {
		let totalCost = 0;
		products?.forEach((product: Product) => {
			totalCost = totalCost + (product.quantity ?? 0) * product.cost;
		});

		return totalCost;
	}

	viewOrderDetails(order: Order) {
		this.selectedOrder = order;
		document.querySelector('#modal-side')?.classList.add('open');
	}

	closeModal() {
		document.querySelector('#modal-side')?.classList.remove('open');
	}
}
