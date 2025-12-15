import { IOrderRepository } from 'src/orders/domain/repositories/iorder.repository';
import { Nullable } from 'src/core/application/types/nullable.types';
import { EntityManager } from '@mikro-orm/core';
import Order from 'src/orders/domain/entities/order.entity';
import Uuid from 'src/core/domain/value-objects/uuid.vo';

export class OrderRepository implements IOrderRepository {
  constructor(private readonly em: EntityManager) {}

  async add(order: Order): Promise<Order> {
    await this.em.persistAndFlush(order);
    await this.em.refresh(order);

    return order;
  }

  async findById(id: string | Uuid): Promise<Nullable<Order>> {
    const uuidValue = typeof id === 'string' ? id : id.value;
    return await this.em.findOne(Order, { id: uuidValue } as any, {
      populate: ['items', 'shippingAddress'],
    });
  }
}
