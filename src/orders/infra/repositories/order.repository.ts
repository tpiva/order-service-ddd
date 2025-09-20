import { IOrderRepository } from 'src/orders/domain/repositories/iorder.repository';
import { Nullable } from 'src/core/application/types/nullable.types';
import { EntityManager } from '@mikro-orm/core';
import Order from 'src/orders/domain/entities/order.entity';

export class OrderRepository implements IOrderRepository {
  constructor(private readonly em: EntityManager) {}

  async add(order: Order): Promise<Order> {
    await this.em.persistAndFlush(order);
    await this.em.refresh(order);

    return order;
  }

  async findById(id: number): Promise<Nullable<Order>> {
    return await this.em.findOne(
      Order,
      { id },
      { populate: ['items', 'shippingAddress'] },
    );
  }
}
