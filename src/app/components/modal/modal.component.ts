import {
	Component,
	computed,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { MarketService } from 'src/app/service/market.service';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
	@Input() isPrimaryButtonVisible: boolean = false;
	@Input() isSecondaryButtonVisible: boolean = false;
	@Input() primaryButtonText: string = '';
	@Input() secondaryButtonText: string = '';

	@Output() submittedValue: EventEmitter<MouseEvent> = new EventEmitter();

	constructor(private service: MarketService) {}

	modalHeader = computed(() =>
		this.service.mode() === 'login'
			? 'Login to Your Account'
			: 'Create Your Account'
	);

	ngOnInit(): void {}

	openModal() {
		document.querySelector('#modal-popup')?.classList.add('open');
	}

	emitValue(event: MouseEvent) {
		this.submittedValue.emit(event);
	}

	closeModal(event: MouseEvent) {
		if (event) {
			event.preventDefault();
		}

		document.querySelector('#modal-popup')?.classList.remove('open');
	}

	applyClass() {
		return this.isPrimaryButtonVisible && !this.isSecondaryButtonVisible;
	}
}
