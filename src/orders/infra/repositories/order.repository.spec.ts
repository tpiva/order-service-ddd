import { MikroORM } from '@mikro-orm/core';
import { SqliteDriver, SqlEntityManager } from '@mikro-orm/sqlite';
import { OrderSchema } from './schemas/order.schema';
import { OrderItemSchema } from './schemas/order-item.schema';
import { AddressSchema } from './schemas/address.schema';
import { ProductSchema } from './schemas/product.schema';
import { Address } from 'src/orders/domain/entities/address.entity';
import { OrderStatus } from 'src/orders/domain/entities/order-status.entity';
import Order from 'src/orders/domain/entities/order.entity';
import { OrderRepository } from './order.repository';
import { Product } from 'src/orders/domain/entities/product.entity';
import OrderItem from 'src/orders/domain/entities/order-item.entity';

describe('OrderRepository', () => {
  let orm: MikroORM<SqliteDriver>;
  let em: SqlEntityManager;
  let repository: OrderRepository;

  beforeAll(async () => {
    orm = await MikroORM.init<SqliteDriver>({
      entities: [OrderSchema, OrderItemSchema, AddressSchema, ProductSchema],
      dbName: ':memory:',
      driver: SqliteDriver,
    });
    await orm.schema.createSchema();
  });

  beforeEach(async () => {
    em = orm.em.fork() as SqlEntityManager;
    repository = new OrderRepository(em);
  });

  afterAll(async () => {
    await orm.close(true);
  });

  describe('add', () => {
    it('should persist and return an order', async () => {
      // Arrange
      const address = Address.create({
        street: 'Rua Teste',
        city: 'São Paulo',
        state: 'SP',
        streetNumber: 123,
      });
      await em.persistAndFlush(address);

      const order = Order.create({
        customerId: 1,
        status: OrderStatus.PENDING,
        shippingAddress: address,
      });

      // Act
      const result = await repository.add(order);

      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.customerId).toBe(1);
      expect(result.status).toBe(OrderStatus.PENDING);
      expect(result.shippingAddress).toBeDefined();
      expect(result.createdAt).toBeInstanceOf(Date);
    });

    it('should persist an order with items', async () => {
      // Arrange
      const address = Address.create({
        street: 'Rua Teste',
        city: 'São Paulo',
        state: 'SP',
        streetNumber: 456,
      });
      await em.persistAndFlush(address);

      const product = new Product('Notebook Dell');
      await em.persistAndFlush(product);

      const order = Order.create({
        customerId: 2,
        status: OrderStatus.PENDING,
        shippingAddress: address,
      });

      const orderItem = new OrderItem(product, 2, 5000);
      order.addItem(orderItem);

      // Act
      const result = await repository.add(order);

      // Assert
      expect(result).toBeDefined();
      expect(result.items).toHaveLength(1);
      expect(result.items[0].quantity).toBe(2);
      expect(result.items[0].price).toBe(5000);
      expect(result.items[0].product.name).toBe('Notebook Dell');
    });
  });

  describe('findById', () => {
    it('should find an order by id string', async () => {
      // Arrange
      const address = Address.create({
        street: 'Rua Encontrar',
        city: 'Rio de Janeiro',
        state: 'RJ',
        streetNumber: 789,
      });
      await em.persistAndFlush(address);

      const order = Order.create({
        customerId: 3,
        status: OrderStatus.PAID,
        shippingAddress: address,
      });
      await em.persistAndFlush(order);

      // Act
      const found = await repository.findById(order.id.value);

      // Assert
      expect(found).toBeDefined();
      expect(found?.id.value).toBe(order.id.value);
      expect(found?.customerId).toBe(3);
      expect(found?.status).toBe(OrderStatus.PAID);
    });

    it('should find an order by id UUID object', async () => {
      // Arrange
      const address = Address.create({
        street: 'Rua UUID',
        city: 'Belo Horizonte',
        state: 'MG',
        streetNumber: 321,
      });
      await em.persistAndFlush(address);

      const order = Order.create({
        customerId: 4,
        status: OrderStatus.SHIPPED,
        shippingAddress: address,
      });
      await em.persistAndFlush(order);

      // Act
      const found = await repository.findById(order.id);

      // Assert
      expect(found).toBeDefined();
      expect(found?.id.value).toBe(order.id.value);
      expect(found?.customerId).toBe(4);
      expect(found?.status).toBe(OrderStatus.SHIPPED);
    });

    it('should return null when order is not found', async () => {
      // Act
      const found = await repository.findById(
        '00000000-0000-0000-0000-000000000000',
      );

      // Assert
      expect(found).toBeNull();
    });

    it('should populate items and shippingAddress', async () => {
      // Arrange
      const address = Address.create({
        street: 'Rua Populate',
        city: 'Curitiba',
        state: 'PR',
        streetNumber: 555,
      });
      await em.persistAndFlush(address);

      const product = new Product('Mouse Logitech');
      await em.persistAndFlush(product);

      const order = Order.create({
        customerId: 5,
        status: OrderStatus.PENDING,
        shippingAddress: address,
      });

      const orderItem = new OrderItem(product, 1, 150);
      order.addItem(orderItem);
      await em.persistAndFlush(order);

      // Act
      const found = await repository.findById(order.id);

      // Assert
      expect(found).toBeDefined();
      expect(found?.shippingAddress).toBeDefined();
      expect(found?.shippingAddress.street).toBe('Rua Populate');
      expect(found?.items).toHaveLength(1);
      expect(found?.items[0].product.name).toBe('Mouse Logitech');
    });
  });
});
