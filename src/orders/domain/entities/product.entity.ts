import { AggregateRoot } from 'src/core/domain/aggregate-root';
import Uuid from 'src/core/domain/value-objects/uuid.vo';

export class ProductId extends Uuid {}

type CreateProductCommand = {
  name: string;
};

type ProductProps = {
  id?: ProductId;
  name: string;
};

export class Product extends AggregateRoot {
  id: ProductId;
  name: string;

  constructor(props: ProductProps) {
    super();
    this.id =
      typeof props.id === 'string'
        ? new ProductId(props.id)
        : (props.id ?? new ProductId());
    this.name = props.name;
  }

  public static create(command: CreateProductCommand): Product {
    return new Product(command);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
