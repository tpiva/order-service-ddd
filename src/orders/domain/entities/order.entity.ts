import Uuid from 'src/core/domain/value-objects/uuid.vo';
import { Address } from './address.entity';
import OrderItem from './order-item.entity';
import { OrderStatus } from './order-status.entity';
import { AggregateRoot } from 'src/core/domain/aggregate-root';

export class OrderId extends Uuid {}

type CreateOrderCommand = {
  customerId: number;
  status: OrderStatus;
  shippingAddress: Address;
};

type OrderProps = {
  id?: OrderId;
  customerId: number;
  status: OrderStatus;
  shippingAddress: Address;
  createdAt?: Date;
  items?: OrderItem[];
};

export default class Order extends AggregateRoot {
  id: OrderId;
  customerId: number;
  status: OrderStatus = OrderStatus.PENDING;
  shippingAddress: Address;
  createdAt: Date = new Date();
  items: OrderItem[] = [];

  constructor(props: OrderProps) {
    super();
    this.id =
      typeof props.id === 'string'
        ? new OrderId(props.id)
        : (props.id ?? new OrderId());
    this.customerId = props.customerId;
    this.status = props.status;
    this.shippingAddress = props.shippingAddress;
    if (props.createdAt) {
      this.createdAt = props.createdAt;
    }
    if (props.items) {
      this.items = props.items;
    }
  }

  static create(command: CreateOrderCommand): Order {
    const order = new Order(command);
    return order;
  }

  public addItem(item: OrderItem): void {
    this.items.push(item);
  }

  toJSON() {
    return {
      id: this.id.value,
      customerId: this.customerId,
      status: this.status,
      shippingAddress: this.shippingAddress.getAsJson(),
      createdAt: this.createdAt,
      items: this.items.map((item) => item.toJSON()),
    };
  }
}
