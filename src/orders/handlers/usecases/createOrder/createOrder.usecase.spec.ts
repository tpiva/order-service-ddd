import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderUseCase } from './createOrder.useCase';
import { IAddressRepository } from 'src/orders/domain/repositories/iorder.repository';
import { Address } from 'src/orders/domain/entities/address.entity';

describe('CreateOrderUseCase', () => {
  let useCase: CreateOrderUseCase;
  let addressRepository: jest.Mocked<IAddressRepository>;

  beforeEach(async () => {
    addressRepository = {
      findOrCreate: jest.fn(async (address: Address) => address),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateOrderUseCase,
        { provide: 'IAddressRepository', useValue: addressRepository },
      ],
    }).compile();

    useCase = module.get<CreateOrderUseCase>(CreateOrderUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create an order successfully', async () => {
    const input = {
      customerId: 1,
      address: {
        street: 'Test Street',
        city: 'Test City',
        state: 'Test State',
        number: 123,
      },
    };

    const result = await useCase.execute(input);

    expect(result).toBeDefined();
    expect(result.order).toBeDefined();
    expect(result.order.customerId).toBe(input.customerId);
    expect(result.order.shippingAddress).toEqual({
      street: input.address.street,
      city: input.address.city,
      state: input.address.state,
      streetNumber: input.address.number,
    });
  });
});
