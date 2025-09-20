import Order from './order.entity';
import { Product } from './product.entity';

export default class OrderItem {
  public order?: Order;
  public id?: number;
  public product: Product;
  public quantity: number;
  public price: number;

  constructor(
    product: Product,
    quantity: number,
    price: number,
    order?: Order,
  ) {
    this.product = product;
    this.quantity = quantity;
    this.price = price;
    this.order = order;
  }

  public get productId(): number {
    return this.product.id;
  }

  public getAsJson() {
    return {
      id: this.id,
      product: this.product.getAsJson(),
      quantity: this.quantity,
      price: this.price,
    };
  }
}
