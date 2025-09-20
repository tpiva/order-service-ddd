export class Address {
  public id?: number;
  public street: string;
  public city: string;
  public state: string;
  public streetNumber: number;

  constructor(
    street: string,
    city: string,
    state: string,
    streetNumber: number,
  ) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.streetNumber = streetNumber;
  }

  public getAsJson() {
    return {
      street: this.street,
      city: this.city,
      state: this.state,
      streetNumber: this.streetNumber,
    };
  }
}
