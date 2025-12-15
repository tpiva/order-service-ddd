import { EntitySchema } from '@mikro-orm/core';
import { Address } from 'src/orders/domain/entities/address.entity';
import OrderItem from 'src/orders/domain/entities/order-item.entity';
import { OrderStatus } from 'src/orders/domain/entities/order-status.entity';
import Order from 'src/orders/domain/entities/order.entity';
import { OrderIdSchemaType } from '../types/order-id.type';

const OrderSchema = new EntitySchema<Order>({
  class: Order,
  tableName: 'orders',
  properties: {
    id: {
      type: new OrderIdSchemaType(),
      primary: true,
    },
    customerId: { type: 'number', fieldName: 'customer_id' },
    status: { enum: true, items: () => OrderStatus },
    shippingAddress: {
      kind: 'm:1',
      entity: () => Address,
      fieldName: 'shipping_address_id',
      nullable: false,
    },
    createdAt: { type: 'Date', fieldName: 'created_at' },
    items: {
      kind: '1:m',
      entity: () => OrderItem,
      mappedBy: 'order',
    },
  },
});

export { OrderSchema };
