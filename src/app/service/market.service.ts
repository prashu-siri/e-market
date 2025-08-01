import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Review } from '../interface/review';
import { Observable, Subject } from 'rxjs';
import { Post } from '../interface/post';
import { Product } from '../interface/product';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class MarketService {
	baseUrl: string = environment.apiUrl;
	blogPosts: Post[] = [];
	products: Product[] = [];
	private productAddedSource: Subject<Product[]> = new Subject<Product[]>();
	productAdded$ = this.productAddedSource as Observable<Product[]>;
	private pageNameSource: Subject<string> = new Subject<string>();
	pageName$ = this.pageNameSource as Observable<string>;

	constructor(private http: HttpClient) {}

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
		product.noOfItems = product.quantity;
		if (this.products.length > 0) {
			const itemFound = this.products.find((details) => {
				return details.id == product.id;
			});

			let item = itemFound?.noOfItems ?? 0;
			let quantity = product.quantity ?? 0;

			itemFound ? (item += quantity) : this.products.push(product);
		} else {
			this.products.push(product);
		}

		this.setProducts(this.products);
	}

	addQuantity(product: Product) {
		this.products = this.products.map((details) => {
			if (details.id == product.id) {
				details.quantity = (details?.quantity ?? 0) + 1;
			}

			return details;
		});

		this.setProducts(this.products);
		return this.products;
	}

	removeQuantity(product: Product) {
		this.products = this.products.map((details) => {
			if (details.id == product.id) {
				details.quantity =
					(details?.quantity ?? 0) - 1 <= 0
						? 1
						: (details?.quantity ?? 0) - 1;
			}

			return details;
		});

		this.setProducts(this.products);
		return this.products;
	}

	getProducts(): string {
		return sessionStorage.getItem('products') ?? '';
	}

	setProducts(products: Product[]) {
		this.products = products;
		sessionStorage.setItem('products', JSON.stringify(products));
		this.sendNotification();
	}

	removeProducts() {
		sessionStorage.removeItem('products');
	}

	sendNotification(): void {
		this.productAddedSource.next(this.products);
	}

	fetchStates() {
		const path = this.baseUrl + 'states';

		return this.http.get(path);
	}

	placeOrder(
		products: Product[],
		shipping: any,
		billing: any,
		customer: any
	) {
		const path = this.baseUrl + 'orders';

		const params = {
			products: products,
			shipping: shipping,
			billing: billing,
			email: customer.email,
		};

		return this.http.post(path, JSON.stringify(params));
	}

	getOrders(email: any) {
		const path = this.baseUrl + 'orders?email=' + email;

		return this.http.get(path);
	}

	setpageName(pageName: string) {
		this.pageNameSource.next(pageName);
	}
}
