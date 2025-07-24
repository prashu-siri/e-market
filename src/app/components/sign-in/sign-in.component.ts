import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Alert } from 'src/app/interface/alert';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
	signInForm!: FormGroup;
	signUpForm!: FormGroup;
	alert: Alert = {} as Alert;
	tabs: any = {
		login: true,
		signUp: false,
	};

	constructor(
		private authService: AuthService,
		private fb: FormBuilder,
		private route: Router,
		private activatedRoute: ActivatedRoute,
		private title: Title
	) {}

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
		if (this.signInForm.invalid) {
			this.signInForm.markAllAsTouched();
		} else {
			this.authService
				.login(this.signInForm.value)
				.subscribe((response) => {
					if (response) {
						this.authService.setLogin(response);
						this.route.navigate([this.getRouteToNavigate()], {
							relativeTo: this.activatedRoute,
						});
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
		this.authService.login(this.signUpForm.value).subscribe((response) => {
			if (response) {
				this.alert = {
					isErrorMessage: true,
					message: 'Email Id already exists.',
				};
			} else {
				this.authService
					.signUp(this.signUpForm.value)
					.subscribe((response) => {
						console.log('Sign up successful');
						//redirect to home page or to previous page
						this.authService.setLogin(response);
						this.route.navigate([this.getRouteToNavigate()], {
							relativeTo: this.activatedRoute,
						});
					});
			}
		});
	}

	signUp() {
		if (this.signUpForm.invalid) {
			this.signUpForm.markAllAsTouched();
			return;
		}

		this.checkIfEmailExist();
	}

	activateTab($event: MouseEvent, id: string) {
		$event.preventDefault();
		this.alert = {
			isErrorMessage: false,
			isSuccessMessage: false,
		};

		const keys = Object.keys(this.tabs);
		keys.map((key) => {
			this.tabs[key] = key.toString() === id;
		});
	}

	getRouteToNavigate() {
		return this.authService.currentRoute
			? this.authService.currentRoute
			: 'home';
	}
}
