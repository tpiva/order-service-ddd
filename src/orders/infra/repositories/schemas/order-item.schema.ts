import { EntitySchema } from '@mikro-orm/core';
import OrderItem from 'src/orders/domain/entities/order-item.entity';
import Order from 'src/orders/domain/entities/order.entity';
import { Product } from 'src/orders/domain/entities/product.entity';
import { OrderItemIdSchemaType } from '../types/order-item-id.type';

const OrderItemSchema = new EntitySchema<OrderItem>({
  class: OrderItem,
  tableName: 'order_items',
  properties: {
    id: {
      type: new OrderItemIdSchemaType(),
      primary: true,
    },
    product: {
      kind: 'm:1',
      entity: () => Product,
      fieldName: 'product_id',
      nullable: false,
    },
    quantity: { type: 'number' },
    price: { type: 'number' },
    order: {
      kind: 'm:1',
      entity: () => Order,
      fieldName: 'order_id',
    },
    productId: {
      type: 'string',
      persist: false,
      getter: true,
    },
  },
});

export { OrderItemSchema };
