import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Post } from '../interface/post';
import { Product } from '../interface/product';
import { Review } from '../interface/review';
import { UserAddress } from '../interface/userAddress';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root',
})
export class MarketService {
	baseUrl: string = environment.apiUrl;
	blogPosts: Post[] = [];
	products: Product[] = [];
	cartProducts = signal<Product[]>([]);
	pageName = signal<string>('cart');

	shippingAdress: any;

	mode = signal<'login' | 'signup'>('login');

	constructor(private http: HttpClient, private authService: AuthService) {}

	fetchFeaturedProducts(): Observable<Product[]> {
		const path = this.baseUrl + 'featuredProducts';

		return this.http.get<Product[]>(path).pipe(
			map((products) => {
				products.forEach((product: Product) => {
					product.quantity = 1;
				});
				return products;
			})
		);
	}

	fetchReviews(): Observable<Review[]> {
		const path = this.baseUrl + 'reviews';

		return this.http.get<Review[]>(path);
	}

	fetchPosts(): Observable<Post[]> {
		const path = this.baseUrl + 'posts';
		return this.http.get<Post[]>(path);
	}

	fetchPost(id: number): Observable<Post> {
		const path = this.baseUrl + `posts/${id}`;
		return this.http.get<Post>(path);
	}

	setBlogPosts(blogs: Post[]) {
		this.blogPosts = blogs;
	}

	getBlogPosts() {
		return this.blogPosts;
	}

	fetchProducts(productType: string): Observable<Product[]> {
		const path = productType == 'fruit' ? 'fruits' : 'vegetables';
		const url = this.baseUrl + path;

		return this.http.get<Product[]>(url).pipe(
			map((products) => {
				products.forEach((product: Product) => {
					product.quantity = 1;
				});
				return products;
			})
		);
	}

	addToCart(product: Product) {
		this.cartProducts.update((currentProducts) => {
			if (currentProducts.length > 0) {
				let existingProduct = currentProducts.find(
					(p) => p.id === product.id
				);

				if (existingProduct) {
					return currentProducts.map((p) =>
						p.id === product.id
							? { ...p, quantity: (p.quantity || 0) + 1 }
							: p
					);
				} else {
					return [...currentProducts, product];
				}
			}
			return [product];
		});
	}

	addQuantity(product: Product) {
		this.cartProducts.update(() => {
			return this.cartProducts().map((cartProduct: Product) => {
				if (cartProduct.id == product.id) {
					cartProduct.quantity = (product?.quantity ?? 0) + 1;
				}

				return cartProduct;
			});
		});
	}

	removeQuantity(product: Product) {
		this.cartProducts.update(() => {
			return this.cartProducts().map((cartProduct) => {
				if (cartProduct.id == product.id) {
					cartProduct.quantity =
						(cartProduct?.quantity ?? 0) - 1 <= 0
							? 1
							: (cartProduct?.quantity ?? 0) - 1;
				}

				return cartProduct;
			});
		});
	}

	removeItemFromCart(product: Product) {
		this.cartProducts.update((currentProducts) => {
			return currentProducts.filter((p) => p.id != product.id);
		});
	}

	getProducts(): string {
		return sessionStorage.getItem('products') ?? '';
	}

	setProducts(products: Product[]) {
		this.cartProducts.set(products);
	}

	removeProducts() {
		sessionStorage.removeItem('products');
	}

	fetchStates() {
		const path = this.baseUrl + 'states';

		return this.http.get(path);
	}

	setAddress(address: any) {
		this.shippingAdress = address;
	}

	placeOrder() {
		const path = this.baseUrl + 'orders';

		const params = {
			orderId: 'POS' + new Date(),
			status: 'Delivered',
			orderedOn: new Date().toUTCString(),
			products: this.products,
			shipping: this.shippingAdress,
			email: this.authService.getLoggedInUser().email,
		};

		return this.http.post(path, JSON.stringify(params));
	}

	getOrders(userId: any) {
		const path = this.baseUrl + 'orders/' + userId;

		return this.http.get(path);
	}

	getAddresses(id: number) {
		const path = this.baseUrl + 'userAddress?userId=' + id;

		return this.http.get(path);
	}

	setpageName(pageName: string) {
		this.pageName.update(() => pageName);
	}

	saveAddress(userAddress: UserAddress) {
		const path = this.baseUrl + 'userAddress/' + userAddress.id;
		return this.http.put(path, JSON.stringify(userAddress));
	}
}
