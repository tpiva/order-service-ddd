import { EntityManager } from '@mikro-orm/core';
import { Address } from 'src/orders/domain/entities/address.entity';
import { IAddressRepository } from 'src/orders/domain/repositories/iorder.repository';

export class AddressRepository implements IAddressRepository {
  constructor(private readonly em: EntityManager) {}

  async findOrCreate(address: Address): Promise<Address> {
    const found = await this.em.findOne(Address, {
      street: address.street,
      city: address.city,
      state: address.state,
      streetNumber: address.streetNumber,
    });
    if (found) return found;
    await this.em.persistAndFlush(address);
    return address;
  }
}
