import { Address } from './address.entity';
import OrderItem from './order-item.entity';
import { OrderStatus } from './order-status.entity';

export default class Order {
  id: number;
  customerId: number;
  status: OrderStatus;
  shippingAddress: Address;
  createdAt: Date;
  items: OrderItem[] = [];

  constructor(
    customerId: number,
    status: OrderStatus,
    shippingAddress: Address,
    createdAt: Date = new Date(),
  ) {
    this.customerId = customerId;
    this.status = status;
    this.shippingAddress = shippingAddress;
    this.createdAt = createdAt;
  }

  public addItem(item: OrderItem): void {
    this.items.push(item);
  }

  public getAsJson() {
    return {
      id: this.id,
      customerId: this.customerId,
      status: this.status,
      shippingAddress: this.shippingAddress.getAsJson(),
      createdAt: this.createdAt,
      items: this.items.map((item) => item.getAsJson()),
    };
  }
}
