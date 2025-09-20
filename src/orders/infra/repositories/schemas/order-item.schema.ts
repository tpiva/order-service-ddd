import { EntitySchema } from '@mikro-orm/core';
import OrderItem from '../../../../domain/entities/order/order-item.entity';
import { Product } from 'src/domain/entities/order/product.entity';
import Order from 'src/domain/entities/order/order.entity';

const OrderItemSchema = new EntitySchema<OrderItem>({
  class: OrderItem,
  tableName: 'order_items',
  properties: {
    id: { type: 'number', primary: true, autoincrement: true },
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
      type: 'number',
      persist: false,
      getter: true,
    },
  },
});

export { OrderItemSchema };
