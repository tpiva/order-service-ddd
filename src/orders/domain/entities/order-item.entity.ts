import { AggregateRoot } from 'src/core/domain/aggregate-root';
import Order from './order.entity';
import { Product, ProductId } from './product.entity';
import Uuid from 'src/core/domain/value-objects/uuid.vo';

export class OrderItemId extends Uuid {}

type CreateOrderItemCommand = {
  product: Product;
  quantity: number;
  price: number;
  order?: Order;
};

type OrderItemProps = {
  id?: OrderItemId;
  product: Product;
  quantity: number;
  price: number;
  order?: Order;
};

export default class OrderItem extends AggregateRoot {
  public order?: Order;
  public id: OrderItemId;
  public product: Product;
  public quantity: number;
  public price: number;

  constructor(props: OrderItemProps) {
    super();
    this.id =
      typeof props.id === 'string'
        ? new OrderItemId(props.id)
        : (props.id ?? new OrderItemId());
    this.product = props.product;
    this.quantity = props.quantity;
    this.price = props.price;
    this.order = props.order;
  }

  static create(command: CreateOrderItemCommand): OrderItem {
    const orderItem = new OrderItem(command);
    return orderItem;
  }

  public get productId(): ProductId {
    return this.product.id;
  }

  toJSON() {
    return {
      id: this.id.value,
      product: this.product.toJSON(),
      quantity: this.quantity,
      price: this.price,
    };
  }
}
