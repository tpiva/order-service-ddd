import { EntityManager } from '@mikro-orm/core';
import Uuid from 'src/core/domain/value-objects/uuid.vo';
import { Product } from 'src/orders/domain/entities/product.entity';
import { IProductRepository } from 'src/orders/domain/repositories/iorder.repository';

export class ProductRepository implements IProductRepository {
  constructor(private readonly em: EntityManager) {}

  async findById(id: string | Uuid): Promise<Product> {
    const uuidValue = typeof id === 'string' ? id : id.value;
    return this.em.findOneOrFail(Product, { id: uuidValue } as any);
  }
}
