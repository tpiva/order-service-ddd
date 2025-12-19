/* eslint-disable @typescript-eslint/no-unused-vars */
import { Type, Platform, EntityProperty } from '@mikro-orm/core';
import { ProductId } from 'src/orders/domain/entities/product.entity';

export class ProductIdSchemaType extends Type<ProductId, string> {
  convertToDatabaseValue(
    valueObject: ProductId | undefined | null,
    platform: Platform,
  ): string {
    return valueObject instanceof ProductId
      ? valueObject.value
      : (valueObject as string);
  }

  convertToJSValue(value: string | ProductId, platform: Platform): ProductId {
    return value instanceof ProductId ? value : new ProductId(value);
  }

  getColumnType(prop: EntityProperty, platform: Platform) {
    return `varchar(36)`;
  }
}
