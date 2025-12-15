import { EntitySchema } from '@mikro-orm/core';
import { Address } from 'src/orders/domain/entities/address.entity';
import { AddressIdSchemaType } from '../types/address-id.type';

export const AddressSchema = new EntitySchema<Address>({
  class: Address,
  properties: {
    id: {
      type: new AddressIdSchemaType(),
      primary: true,
    },
    street: { type: 'string', length: 255 },
    city: { type: 'string', length: 255 },
    state: { type: 'string', length: 255 },
    streetNumber: { type: 'number', fieldName: 'street_number' },
  },
});
