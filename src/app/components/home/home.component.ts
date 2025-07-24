import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MarketService } from '../../service/market.service';
import { Product } from '../../interface/product';
import { Review } from '../../interface/review';
import { Post } from '../../interface/post';
import { ModalComponent } from '../modal/modal.component';
import { SubscriptionContainer } from '../../helper/subscription-container';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
	products: Product[] = [];
	reviews: Review[] = [];
	posts: Post[] = [];
	previewProductDetails: Product = {} as Product;
	subscriptionContainer = new SubscriptionContainer();
	isLoading: boolean = false;

	@ViewChild(ModalComponent)
	modal!: ModalComponent;

	constructor(private service: MarketService, private title: Title) {}

	ngOnInit(): void {
		this.title.setTitle('Purilo | Home');
		this.isLoading = true;
		this.fetchFeaturedProducts();
		this.fetchReviews();
		this.fetchPosts();
	}

	fetchFeaturedProducts(): void {
		this.subscriptionContainer.addSubscription = this.service
			.fetchFeaturedProducts()
			.subscribe((response: Product[]) => {
				this.products = response;
				this.isLoading = false;
			});
	}

	fetchReviews(): void {
		this.subscriptionContainer.addSubscription = this.service
			.fetchReviews()
			.subscribe((response: Review[]) => {
				this.reviews = response;
				this.isLoading = false;
			});
	}

	fetchPosts(): void {
		this.subscriptionContainer.addSubscription = this.service
			.fetchPosts()
			.subscribe((response: Post[]) => {
				this.posts = response;
				this.service.setBlogPosts(this.posts);
				this.isLoading = false;
			});
	}

	preview(product: Product) {
		this.previewProductDetails = product;
		this.modal.openModal();
	}

	ngOnDestroy(): void {
		this.subscriptionContainer.removeSubscription();
	}

	addToCart(product: Product) {
		this.service.addToCart(product);
	}
}
