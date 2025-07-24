import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../service/market.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
	paymentType: string = 'card';
	cardPaymentForm!: FormGroup;

	constructor(private service: MarketService) {
		this.cardPaymentForm = new FormGroup({
			cardNumber: new FormControl('', [
				Validators.required,
				Validators.pattern('^[0-9]$'),
			]),
			expiry: new FormControl('', [Validators.required]),
			cvv: new FormControl('', [Validators.required]),
			nameOnCard: new FormControl('', [Validators.required]),
		});
	}

	ngOnInit(): void {}

	navigateToPreviousPage() {
		this.service.setpageName('shipping');
	}

	processPayment() {
		console.log('proceed to payment with ', this.paymentType);
		if (this.paymentType == 'card') {
			if (!this.cardPaymentForm.valid) {
				this.cardPaymentForm.markAllAsTouched();
				return;
			} else {
				console.log('Payment successful');
			}
		}
	}
}
