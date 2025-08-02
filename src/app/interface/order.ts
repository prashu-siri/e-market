import { Product } from "./product";

export interface Order {
	orderId: string;
	orderedOn: string;
	status: string;
	products: Product[];
}
