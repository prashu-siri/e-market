import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogHomeComponent } from './components/blog-home/blog-home.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

const routes: Routes = [
	{
		path: 'blog',
		component: BlogHomeComponent,
		children: [
			{ path: ':id', component: BlogPostComponent },
			{ path: '', component: BlogsComponent },
		],
	},
	{ path: 'product/:item', component: ProductComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: 'cart', component: CartComponent },
	{ path: 'checkout', component: CheckoutComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'login', component: SignInComponent },
	{ path: 'home', component: HomeComponent },
	{ path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
