import { EntityManager } from '@mikro-orm/core';
import OrderItem from 'src/orders/domain/entities/order-item.entity';
import Order from 'src/orders/domain/entities/order.entity';
import { IOrderItemRepository } from 'src/orders/domain/repositories/iorder.repository';

export class OrderItemsRepository implements IOrderItemRepository {
  constructor(private readonly em: EntityManager) {}
  async add(items: OrderItem[], order: Order): Promise<void> {
    items.forEach((item) => {
      item.order = order;
      this.em.persist(item);
    });
  }
}
