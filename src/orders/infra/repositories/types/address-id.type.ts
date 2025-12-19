/* eslint-disable @typescript-eslint/no-unused-vars */
import { Type, Platform, EntityProperty } from '@mikro-orm/core';
import { AddressId } from 'src/orders/domain/entities/address.entity';

export class AddressIdSchemaType extends Type<AddressId, string> {
  convertToDatabaseValue(
    valueObject: AddressId | undefined | null,
    platform: Platform,
  ): string {
    return valueObject instanceof AddressId
      ? valueObject.value
      : (valueObject as string);
  }

  convertToJSValue(value: string | AddressId, platform: Platform): AddressId {
    return value instanceof AddressId ? value : new AddressId(value);
  }

  getColumnType(prop: EntityProperty, platform: Platform) {
    return `varchar(36)`;
  }
}
