import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Login } from '../interface/login';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	basePath;
	currentRoute: string = '';

	constructor(private http: HttpClient) {
		this.basePath = environment.apiUrl;
	}

	setLogin(login: any) {
		const loginDetails = {
			firstName: login.firstName,
			lastName: login.lastName,
			email: login.email,
		};
		sessionStorage.setItem('login', JSON.stringify(loginDetails));
	}

	isLoggedIn() {
		return sessionStorage.getItem('login') !== null;
	}

	getLoggedInUser() {
		return JSON.parse(sessionStorage.getItem('login') ?? '');
	}

	signOut() {
		sessionStorage.removeItem('login');
	}

	login(value: any) {
		const requestParams = new HttpParams().set('email', value.email);
		return this.http
			.get<Login[]>(this.basePath + 'marketLogin', {
				params: requestParams,
			})
			.pipe(
				map((response: Login[]) => {
					if (response.length > 0) {
						this.setLogin(response[0]);
						return response[0];
					} else {
						return null;
					}
				})
			);
	}

	signUp(value: any) {
		return this.http.post(
			this.basePath + 'marketLogin',
			JSON.stringify(value)
		);
	}

	setCurrentRoute(url: string) {
		this.currentRoute = url;
	}
}
