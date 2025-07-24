import { Component, forwardRef, Input } from '@angular/core';
import {
	ControlValueAccessor,
	FormControl,
	FormGroup,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectComponent),
			multi: true,
		},
	],
})
export class SelectComponent implements ControlValueAccessor {
	@Input()
	items!: any[];

	@Input()
	fieldName!: string;

	@Input()
	label!: string;

	@Input()
	fieldId!: string;

	@Input()
	form!: FormGroup;

	value: string = '';
	change!: (value: any) => void;
	touched!: () => void;
	isDisabled: boolean = false;

	constructor() {}

	ngOnInit(): void {}

	registerOnChange(fn: any): void {
		this.change = fn;
	}

	registerOnTouched(fn: any): void {
		this.touched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}

	writeValue(obj: any): void {
		this.value = obj;
	}

	get fieldValue(): FormControl {
		return this.form.get(this.fieldName) as FormControl;
	}
}
