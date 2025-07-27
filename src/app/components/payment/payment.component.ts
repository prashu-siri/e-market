import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../service/market.service';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	ValidatorFn,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
	paymentType: string = 'card';
	cardPaymentForm!: FormGroup;

	constructor(private service: MarketService, private router: Router) {
		this.cardPaymentForm = new FormGroup({
			cardNumber: new FormControl('', [
				Validators.required,
				Validators.minLength(12),
				this.luhnValidator(),
			]),
			expiry: new FormControl('', [
				Validators.required,
				Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/),
				this.validateExpiry(),
			]),
			cvv: new FormControl('', [
				Validators.required,
				Validators.pattern(/^\d{3,4}$/),
			]),
			nameOnCard: new FormControl('', [Validators.required]),
		});
	}

	luhnValidator(): ValidatorFn {
		return (control: AbstractControl) => {
			const value = control.value?.replace(/\s+/g, '');
			if (!value || value.length < 12) return { luhnCheck: true };

			const digits = value.split('').map(Number);
			const lastDigit = digits.pop()!;
			const sum = digits
				.reverse()
				.map((d: any, i: any) =>
					i % 2 === 0 ? (d * 2 > 9 ? d * 2 - 9 : d * 2) : d
				)
				.reduce((acc: number, val: number) => acc + val, 0);
			return (sum + lastDigit) % 10 === 0 ? null : { luhnCheck: true };
		};
	}

	validateExpiry(): ValidatorFn {
		return (control: AbstractControl) => {
			const value = control.value;

			if (!value) return null;

			const monthStr = value.slice(0, 2);
			const yearStr = value.slice(3);
			const month = parseInt(monthStr, 10);
			let year = parseInt(yearStr, 10);

			// Convert YY to YYYY if needed
			if (yearStr.length === 2) {
				const currentYear = new Date().getFullYear();
				const base = Math.floor(currentYear / 100) * 100;
				year += base;
			}

			const now = new Date();
			const expiry = new Date(year, month - 1, 1);
			const current = new Date(now.getFullYear(), now.getMonth(), 1);

			return expiry >= current ? null : { expired: true };
		};
	}

	ngOnInit(): void {}

	navigateToPreviousPage() {
		this.service.setpageName('shipping');
	}

	processPayment() {
		if (this.paymentType == 'card') {
			if (this.cardPaymentForm.invalid) {
				this.cardPaymentForm.markAllAsTouched();
				return;
			} else {
				this.router.navigate(['confirmation']);
				this.service.setProducts([]);
			}
		} else if(this.paymentType == 'cod'){
			this.router.navigate(['confirmation']);
			this.service.setProducts([]);
		}
	}

	get cardNumber(): FormControl {
		return this.cardPaymentForm.controls['cardNumber'] as FormControl;
	}

	get expiry(): FormControl {
		return this.cardPaymentForm.controls['expiry'] as FormControl;
	}

	get cvv(): FormControl {
		return this.cardPaymentForm.controls['cvv'] as FormControl;
	}

	get nameOnCard(): FormControl {
		return this.cardPaymentForm.controls['nameOnCard'] as FormControl;
	}
}
