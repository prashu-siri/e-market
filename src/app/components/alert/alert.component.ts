import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Alert } from 'src/app/interface/alert';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
	timeout: number = 500;
	@Input()
	alertDetails!: Alert;

	constructor() {}

	ngOnDestroy(): void {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
	}

	ngOnInit(): void {
		this.alertDetails = {
			message: '',
			isErrorMessage: false,
			isSuccessMessage: false,
		};
	}

	isShowAlert() {
		if (
			this.alertDetails.isSuccessMessage ||
			this.alertDetails.isErrorMessage
		) {
			this.focus();
		}
		return (
			this.alertDetails.isSuccessMessage ||
			this.alertDetails.isErrorMessage
		);
	}

	focus() {
		const element = document.getElementById('alert');
		if (element != null) {
			window.scrollTo({
				top: element.offsetTop - 100,
				behavior: 'smooth',
			});
		}
	}
}
