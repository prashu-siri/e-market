import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Alert } from 'src/app/interface/alert';
import { MarketService } from 'src/app/service/market.service';
import { AuthService } from '../../service/auth.service';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
	signInForm!: FormGroup;
	signUpForm!: FormGroup;
	alert: Alert = {} as Alert;
	isSignUp: boolean = false;

	constructor(
		private authService: AuthService,
		private fb: FormBuilder,
		private title: Title,
		private service: MarketService
	) {}

	@Output() loginSuccess = new EventEmitter<MouseEvent>();

	ngOnInit(): void {
		this.title.setTitle('Purilo | Login');
		this.signInForm = this.fb.group({
			email: [
				'',
				[
					Validators.required,
					Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
				],
			],
			password: ['', Validators.required],
		});

		this.signUpForm = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: [
				'',
				[
					Validators.required,
					Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
				],
			],
			password: ['', Validators.required],
		});
	}

	login() {
		this.clearErrors();
		if (this.signInForm.invalid) {
			this.signInForm.markAllAsTouched();
		} else {
			this.authService
				.login(this.signInForm.value, 'login')
				.subscribe((response) => {
					console.log(response);
					if (response) {
						this.authService.setLogin(response);
						this.loginSuccess.emit();
					} else {
						this.alert = {
							isSuccessMessage: false,
							isErrorMessage: true,
							message:
								'We are unable to find the account associated with this email. ' +
								'Kindly verify your credentials',
						};
					}
				});
		}
	}

	checkIfEmailExist() {
		this.authService
			.login(this.signUpForm.value, 'checkEmail')
			.subscribe((response) => {
				if (response) {
					this.alert = {
						isErrorMessage: true,
						message: 'Email Id already exists.',
					};
				} else {
					console.log('email already exists but signing up');
					this.authService
						.signUp(this.signUpForm.value)
						.subscribe((response) => {
							//redirect to home page or to previous page
							this.authService.setLogin(response);
							this.loginSuccess.emit();
						});
				}
			});
	}

	signUp() {
		this.clearErrors();
		if (this.signUpForm.invalid) {
			this.signUpForm.markAllAsTouched();
			return;
		}

		this.checkIfEmailExist();
	}

	activateTab($event: MouseEvent, id: string) {
		$event.preventDefault();
		this.clearErrors();

		if (id == 'signup') {
			this.isSignUp = true;
			this.service.mode.set('signup');
		} else {
			this.isSignUp = false;
			this.service.mode.set('login');
		}
	}

	clearErrors() {
		this.alert = {
			isErrorMessage: false,
			isSuccessMessage: false,
		};
	}

	getRouteToNavigate() {
		return this.authService.currentRoute
			? this.authService.currentRoute
			: 'home';
	}

	closeModal($event: MouseEvent) {
		if ($event) {
			$event.preventDefault();
		}
		this.loginSuccess.emit();
		this.isSignUp = false;
		this.service.mode.set('login');
	}
}
