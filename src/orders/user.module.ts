import { Module } from '@nestjs/common';
import { OrderController } from 'src/orders/handlers/controllers/order.controller';
import { AddressRepository } from 'src/orders/infra/repositories/address.repository';
import { OrderRepository } from 'src/orders/infra/repositories/order.repository';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OrderSchema } from 'src/orders/infra/repositories/schemas/order.schema';
import { AddressSchema } from 'src/orders/infra/repositories/schemas/address.schema';
import { EntityManager } from '@mikro-orm/core';
import { ProductRepository } from 'src/orders/infra/repositories/product.repository';
import { CreateOrderUseCase } from './handlers/usecases/createOrder/createOrder.useCase';

@Module({
  imports: [MikroOrmModule.forFeature([OrderSchema, AddressSchema])],
  providers: [
    CreateOrderUseCase,
    {
      provide: 'IAddressRepository',
      useFactory: (em: EntityManager) => new AddressRepository(em),
      inject: [EntityManager],
    },
    {
      provide: 'IOrderRepository',
      useFactory: (em: EntityManager) => new OrderRepository(em),
      inject: [EntityManager],
    },
    {
      provide: 'IProductRepository',
      useFactory: (em: EntityManager) => new ProductRepository(em),
      inject: [EntityManager],
    },
  ],
  controllers: [OrderController],
})
export class UserModule {}
