import { EntityManager } from '@mikro-orm/core';
import { IOrderItemRepository } from 'src/domain/repositories/iorder.repository';
import OrderItem from 'src/domain/entities/order/order-item.entity';
import Order from 'src/domain/entities/order/order.entity';

export class OrderItemsRepository implements IOrderItemRepository {
  constructor(private readonly em: EntityManager) {}
  async add(items: OrderItem[], order: Order): Promise<void> {
    items.forEach((item) => {
      item.order = order;
      this.em.persist(item);
    });
  }
}
