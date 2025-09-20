import { EntitySchema } from '@mikro-orm/core';
import { Address } from '../../../../domain/entities/order/address.entity';

export const AddressSchema = new EntitySchema<Address>({
  class: Address,
  properties: {
    id: { type: 'number', primary: true, autoincrement: true },
    street: { type: 'string', length: 255 },
    city: { type: 'string', length: 255 },
    state: { type: 'string', length: 255 },
    streetNumber: { type: 'number', fieldName: 'street_number' },
  },
});
