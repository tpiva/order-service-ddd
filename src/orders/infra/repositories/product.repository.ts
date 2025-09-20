import { EntityManager } from '@mikro-orm/core';
import { Product } from 'src/orders/domain/entities/product.entity';
import { IProductRepository } from 'src/orders/domain/repositories/iorder.repository';

export class ProductRepository implements IProductRepository {
  constructor(private readonly em: EntityManager) {}

  async findById(id: number): Promise<Product> {
    return this.em.findOneOrFail(Product, { id });
  }
}
