import { Component, Input } from '@angular/core';
import { Address } from 'src/app/interface/address';
import { Alert } from 'src/app/interface/alert';
import { UserAddress } from 'src/app/interface/userAddress';
import { MarketService } from 'src/app/service/market.service';

@Component({
	selector: 'app-address',
	templateUrl: './address.component.html',
	styleUrl: './address.component.scss',
})
export class AddressComponent {
	@Input()
	userAddress!: UserAddress;

	addressId: string = '';
	alert: Alert = {} as Alert;

	constructor(private service: MarketService) {}

	openModal(event: MouseEvent, address: Address) {
		event?.preventDefault();

		if (address.default) {
			this.alert = {
				isSuccessMessage: false,
				isErrorMessage: true,
				message: 'You cannot delete a default address',
				heading: 'Error',
			};
			return;
		}

		this.addressId = address.addressId;
		document.querySelector('#modal')?.classList.add('open');
	}
	editAddress(event: MouseEvent) {
		event?.preventDefault();
		//open a modal window with a form to edit the address
	}

	deleteAddress() {
		const filteredAddress = this.userAddress.address.filter(
			(address) => address.addressId != this.addressId
		);
		this.userAddress = { ...this.userAddress, address: filteredAddress };
		this.service
			.saveAddress(this.userAddress)
			.subscribe((response: any) => {
				this.closeModal();
			});
	}

	closeModal() {
		document.querySelector('#modal')?.classList.remove('open');
	}
}
