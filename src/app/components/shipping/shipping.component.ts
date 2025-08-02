import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MarketService } from 'src/app/service/market.service';
import { AuthService } from './../../service/auth.service';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';

@Component({
	selector: 'app-shipping',
	templateUrl: './shipping.component.html',
	styleUrls: ['./shipping.component.scss'],
})
export class ShippingComponent implements OnInit {
	@Input()
	form!: FormGroup;

	@Input()
	states!: any[];

	addressTypes: any[] = [
		{ code: 'res', name: 'Residential' },
		{ code: 'bus', name: 'Business' },
	];

	@ViewChild(ModalComponent)
	modal!: ModalComponent;

	constructor(
		private service: MarketService,
		private authService: AuthService,
		private router: Router
	) {}

	ngOnInit(): void {}

	isLoggedIn() {
		return this.authService.isLoggedIn();
	}

	handleLoginSuccess(event: MouseEvent) {
		this.modal.closeModal(event);
	}

	navigateToPreviousPage() {
		this.service.setpageName('cart');
	}

	openLoginModal() {
		this.modal.openModal();
	}

	navigateToHome() {
		this.router.navigate(['home']);
	}

	submit() {
		if (this.form.valid) {
			this.service.setpageName('payment');
			this.service.setAddress(this.form.value);
		} else {
			this.form.markAllAsTouched();
		}
	}

	get firstName(): FormControl {
		return this.form.get('firstName') as FormControl;
	}

	get lastName(): FormControl {
		return this.form.get('lastName') as FormControl;
	}

	get phoneNumber(): FormControl {
		return this.form.get('phoneNumber') as FormControl;
	}

	get email(): FormControl {
		return this.form.get('email') as FormControl;
	}

	get address(): FormControl {
		return this.form.get('address') as FormControl;
	}

	get landmark(): FormControl {
		return this.form.get('landmark') as FormControl;
	}

	get addressType(): FormControl {
		return this.form.get('addressType') as FormControl;
	}

	get city(): FormControl {
		return this.form.get('city') as FormControl;
	}

	get state(): FormControl {
		return this.form.get('state') as FormControl;
	}

	get postCode(): FormControl {
		return this.form.get('postalCode') as FormControl;
	}
}
