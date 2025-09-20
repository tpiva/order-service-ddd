import { EntityManager } from '@mikro-orm/core/EntityManager';
import { Product } from 'src/domain/entities/order/product.entity';
import { IProductRepository } from 'src/domain/repositories/iorder.repository';

export class ProductRepository implements IProductRepository {
  constructor(private readonly em: EntityManager) {}

  async findById(id: number): Promise<Product> {
    return this.em.findOneOrFail(Product, { id });
  }
}
