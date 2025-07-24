import { Component, OnInit } from '@angular/core';
import { Post } from '../../interface/post';
import { MarketService } from '../../service/market.service';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-blogs',
	templateUrl: './blogs.component.html',
	styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
	blogPosts: Post[] = [];

	constructor(private service: MarketService, private title: Title) {}

	ngOnInit(): void {
		this.title.setTitle('Purilo | Blog');
		this.blogPosts = this.service.getBlogPosts();

		if (this.blogPosts.length == 0) {
			this.fetchPosts();
		}
	}

	fetchPosts(): void {
		this.service.fetchPosts().subscribe((response: Post[]) => {
			this.blogPosts = response;
			this.service.setBlogPosts(this.blogPosts);
		});
	}
}
