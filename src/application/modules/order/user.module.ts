import { Module } from '@nestjs/common';
import { CreateOrderUseCase } from './usecases/createOrder/createOrder.useCase';
import { OrderController } from 'src/adapters/controllers/order.controller';
import { AddressRepository } from 'src/adapters/database/repositories/order/address.repository';
import { OrderRepository } from 'src/adapters/database/repositories/order/order.repository';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OrderSchema } from 'src/adapters/database/schemas/order/order.schema';
import { AddressSchema } from 'src/adapters/database/schemas/order/address.schema';
import { EntityManager } from '@mikro-orm/core';
import { ProductRepository } from 'src/adapters/database/repositories/order/product.repository';

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
