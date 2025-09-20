import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { CreateOrderUseCase } from 'src/orders/handlers/usecases/createOrder/createOrder.useCase';
import { Address } from 'src/domain/entities/order/address.entity';

describe('OrderController', () => {
  let controller: OrderController;
  let createOrderUseCase: { execute: jest.Mock };

  beforeEach(async () => {
    createOrderUseCase = {
      execute: jest.fn(async (dto) => ({
        order: {
          id: 'order-1',
          customerId: dto.customerId,
          status: 'PENDING',
          shippingAddress: new Address(
            dto.address.street,
            dto.address.city,
            dto.address.state,
            dto.address.number,
          ),
          createdAt: new Date(),
        },
      })),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        { provide: CreateOrderUseCase, useValue: createOrderUseCase },
        {
          provide: 'IAddressRepository',
          useValue: { findOrCreate: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an order successfully', async () => {
    const result = await controller.createOrder({
      customerId: 1,
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        number: 123,
      },
    });

    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.customerId).toBe(1);
    expect(result.status).toBe('PENDING');
    expect(result.shippingAddress).toBeDefined();
    expect(result.shippingAddress.street).toBe('123 Main St');
    expect(result.shippingAddress.city).toBe('Anytown');
    expect(result.shippingAddress.state).toBe('CA');
    expect(result.createdAt).toBeDefined();
  });
});
