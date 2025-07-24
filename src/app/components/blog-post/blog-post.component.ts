import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MarketService } from '../../service/market.service';
import { Post } from '../../interface/post';
import { SubscriptionContainer } from '../../helper/subscription-container';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-blog-post',
	templateUrl: './blog-post.component.html',
	styleUrls: ['./blog-post.component.scss'],
})
export class BlogPostComponent implements OnInit, OnDestroy {
	post: Post = {} as Post;
	subscriptionContainer = new SubscriptionContainer();
	constructor(
		private route: ActivatedRoute,
		private service: MarketService,
		private title: Title
	) {}

	ngOnInit(): void {
		this.title.setTitle('Purilo | Blog | Blog Post');
		this.route.paramMap.subscribe((params: ParamMap) => {
			this.fetchBlogPost(+(params.get('id') ?? 0));
		});
	}

	fetchBlogPost(id: number) {
		this.subscriptionContainer.addSubscription = this.service
			.fetchPost(id)
			.subscribe((response) => {
				this.post = response;
			});
	}

	ngOnDestroy(): void {
		this.subscriptionContainer.removeSubscription();
	}
}
