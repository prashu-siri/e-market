import { Subscription } from 'rxjs';

export class SubscriptionContainer {
	private subscription: Subscription[] = [];

	set addSubscription(s: Subscription) {
		this.subscription?.push(s);
	}

	removeSubscription() {
		this.subscription?.forEach((s) => s.unsubscribe());
	}
}
