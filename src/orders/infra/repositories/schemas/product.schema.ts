import { EntitySchema } from '@mikro-orm/core';
import { Product } from 'src/orders/domain/entities/product.entity';

export const ProductSchema = new EntitySchema<Product>({
  class: Product,
  properties: {
    id: { type: 'number', primary: true, autoincrement: true },
    name: { type: 'string', length: 255 },
  },
});
