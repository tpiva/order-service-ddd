import { EntitySchema } from '@mikro-orm/core';
import { Product } from 'src/orders/domain/entities/product.entity';
import { ProductIdSchemaType } from '../types/product-id.type';

export const ProductSchema = new EntitySchema<Product>({
  class: Product,
  properties: {
    id: {
      type: new ProductIdSchemaType(),
      primary: true,
    },
    name: { type: 'string', length: 255 },
  },
});
