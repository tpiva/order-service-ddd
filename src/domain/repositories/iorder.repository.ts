import { Nullable } from 'src/domain/types/nullable.types';
import Order from '../entities/order/order.entity';
import { Address } from '../../domain/entities/order/address.entity';
import OrderItem from '../entities/order/order-item.entity';
import { Product } from '../entities/order/product.entity';

export interface IOrderRepository {
  add(order: Order): Promise<Order>;
  findById(id: number): Promise<Nullable<Order>>;
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
