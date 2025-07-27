import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { BlogHomeComponent } from './components/blog-home/blog-home.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductComponent } from './components/product/product.component';
import { ProductPreviewComponent } from './components/product-preview/product-preview.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { HeaderInterceptor } from './service/header.interceptor';
import { MarketService } from './service/market.service';
import {
	NotificationsService,
	SimpleNotificationsModule,
} from 'angular2-notifications';
import { AlertComponent } from './components/alert/alert.component';
import { InputComponent } from './components/input/input.component';
import { IconComponent } from './components/icon/icon.component';
import { SelectComponent } from './components/select/select.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		AppComponent,
		ShippingComponent,
		BlogHomeComponent,
		BlogPostComponent,
		BlogsComponent,
		CartComponent,
		CheckoutComponent,
		ContactComponent,
		FooterComponent,
		HeaderComponent,
		HomeComponent,
		OrderSummaryComponent,
		PaymentComponent,
		ProductComponent,
		ProfileComponent,
		SignInComponent,
		ModalComponent,
		ProductPreviewComponent,
		AlertComponent,
		InputComponent,
		IconComponent,
		SelectComponent,
		SpinnerComponent,
		OrderConfirmationComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		SimpleNotificationsModule.forRoot(),
		ReactiveFormsModule,
		CommonModule,
		NgxMaskDirective,
		BrowserAnimationsModule,
	],
	providers: [
		MarketService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HeaderInterceptor,
			multi: true,
		},
		AuthService,
		NotificationsService,
		provideNgxMask(),
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
