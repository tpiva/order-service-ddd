import { Entity } from 'src/core/domain/entity';
import Uuid from 'src/core/domain/value-objects/uuid.vo';
import { omit } from 'lodash';

export class AddressId extends Uuid {}

type AddressProps = {
  id?: AddressId;
  street: string;
  city: string;
  state: string;
  streetNumber: number;
};

type CreateAddressCommand = {
  id?: string;
  street: string;
  city: string;
  state: string;
  streetNumber: number;
};

export class Address extends Entity {
  public id: AddressId;
  public street: string;
  public city: string;
  public state: string;
  public streetNumber: number;

  constructor(props: AddressProps) {
    super();
    this.id =
      typeof props.id === 'string'
        ? new AddressId(props.id)
        : (props.id ?? new AddressId());
    this.street = props.street;
    this.city = props.city;
    this.state = props.state;
    this.streetNumber = props.streetNumber;
  }

  static create(command: CreateAddressCommand): Address {
    const objectToCreate = omit(command, ['id']);

    if (command.id && typeof command.id === 'string') {
      objectToCreate.id = new AddressId(command.id);
    }

    return new Address(objectToCreate);
  }

  toJSON() {
    return {
      street: this.street,
      city: this.city,
      state: this.state,
      streetNumber: this.streetNumber,
    };
  }

  public getAsJson() {
    return {};
  }
}
