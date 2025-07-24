import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
	@Input() modalHeader: string = '';
	@Input() isPrimaryButtonVisible: boolean = true;
	@Input() isSecondaryButtonVisible: boolean = true;
	@Input() primaryButtonText: string = '';
	@Input() secondaryButtonText: string = '';

	@Output() submittedValue: EventEmitter<MouseEvent> = new EventEmitter();

	constructor() {}

	ngOnInit(): void {}

	openModal() {
		document.querySelector('#modal-info')?.classList.add('open');
	}

	emitValue(event: MouseEvent) {
		this.submittedValue.emit(event);
	}

	closeModal(event: MouseEvent) {
		event.preventDefault();
		document.querySelector('#modal-info')?.classList.remove('open');
	}

	applyClass() {
		return this.isPrimaryButtonVisible && !this.isSecondaryButtonVisible;
	}
}
