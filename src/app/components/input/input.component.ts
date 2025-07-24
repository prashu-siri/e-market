import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
	ControlValueAccessor,
	FormControl,
	FormGroup,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputComponent),
			multi: true,
		},
	],
})
export class InputComponent implements OnInit, ControlValueAccessor {
	value!: string;
	change?: (value: string) => void;
	touched?: () => void;
	isDisabled: boolean = false;

	@Input()
	form!: FormGroup;

	@Input()
	label!: string;

	@Input()
	id!: string;

	@Input()
	fieldName!: string;

	@Input()
	type: string = 'text';

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

	writeValue(value: any): void {
		this.value = value;
	}

	get fieldValue(): FormControl {
		return this.form.get(this.fieldName) as FormControl;
	}
}
