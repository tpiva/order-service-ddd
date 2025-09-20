import { MikroORM } from '@mikro-orm/core';
import { SqliteDriver, SqlEntityManager } from '@mikro-orm/sqlite';
import { OrderRepository } from '../../../adapters/database/repositories/order/order.repository';
import { OrderSchema } from './schemas/order.schema';
import { OrderItemSchema } from './schemas/order-item.schema';
import { AddressSchema } from './schemas/address.schema';
import Order from '../../../../domain/entities/order/order.entity';
import { OrderStatus } from '../../../../domain/entities/order/order-status.entity';
import { Address } from '../../../../domain/entities/order/address.entity';

describe('OrderRepository', () => {
  let orm: MikroORM<SqliteDriver>;
  let em: SqlEntityManager;
  let repository: OrderRepository;

  beforeAll(async () => {
    orm = await MikroORM.init<SqliteDriver>({
      entities: [OrderSchema, OrderItemSchema, AddressSchema],
      dbName: ':memory:',
    });
    em = orm.em.fork() as SqlEntityManager;
    repository = new OrderRepository(em);
  });

  afterAll(async () => {
    await orm.close(true);
  });

  it('should persist and retrieve an order', async () => {
    const address = new Address('Rua Teste', 'Cidade', 'UF', 123);
    const order = new Order(1, OrderStatus.PENDING, address, new Date());
    await repository.add(order);
    const found = await repository.findById(1);
    expect(found).toBeDefined();
    expect(found?.id).toBe('order-1');
    expect(found?.customerId).toBe(1);
  });
});
