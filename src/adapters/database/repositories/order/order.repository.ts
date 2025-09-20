import { IOrderRepository } from 'src/domain/repositories/iorder.repository';
import Order from 'src/domain/entities/order/order.entity';
import { Nullable } from 'src/domain/types/nullable.types';
import { EntityManager } from '@mikro-orm/core';

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
