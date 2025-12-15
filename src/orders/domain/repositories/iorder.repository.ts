import { Nullable } from 'src/core/application/types/nullable.types';
import OrderItem from '../entities/order-item.entity';
import Order from '../entities/order.entity';
import { Product } from '../entities/product.entity';
import { Address } from '../entities/address.entity';

export interface IOrderRepository {
  add(order: Order): Promise<Order>;
  findById(id: string): Promise<Nullable<Order>>;
}

export interface IAddressRepository {
  findOrCreate(address: Address): Promise<Address>;
}

export interface IOrderItemRepository {
  add(items: OrderItem[], order: Order): Promise<void>;
}

export interface IProductRepository {
  findById(id: number): Promise<Product>;
}
