/* eslint-disable @typescript-eslint/no-unused-vars */
import { Type, Platform, EntityProperty } from '@mikro-orm/core';
import { OrderItemId } from 'src/orders/domain/entities/order-item.entity';

export class OrderItemIdSchemaType extends Type<OrderItemId, string> {
  convertToDatabaseValue(
    valueObject: OrderItemId | undefined | null,
    platform: Platform,
  ): string {
    return valueObject instanceof OrderItemId
      ? valueObject.value
      : (valueObject as string);
  }

  convertToJSValue(
    value: string | OrderItemId,
    platform: Platform,
  ): OrderItemId {
    return value instanceof OrderItemId ? value : new OrderItemId(value);
  }

  getColumnType(prop: EntityProperty, platform: Platform) {
    return `varchar(36)`;
  }
}
