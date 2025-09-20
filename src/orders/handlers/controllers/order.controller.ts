import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateOrderParamsDto,
  CreateOrderResponseDto,
} from './dtos/createOrder.dto';
import { CreateOrderUseCase } from 'src/orders/handlers/usecases/createOrder/createOrder.useCase';

@Controller('orders')
export class OrderController {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderParamsDto,
  ): Promise<CreateOrderResponseDto> {
    const result = await this.createOrderUseCase.execute(createOrderDto);

    const address = result.order.shippingAddress;
    return {
      id: result.order.id,
      customerId: result.order.customerId,
      status: result.order.status,
      shippingAddress: {
        id: address.id,
        street: address['street'],
        city: address['city'],
        state: address['state'],
        number: address['streetNumber'],
      },
      items: result.order.items.map((item) => ({
        id: item.id,
        product: {
          id: item.product.id,
          name: item.product.name,
        },
        quantity: item.quantity,
        price: item.price,
      })),
      createdAt: result.order.createdAt,
    };
  }
}
