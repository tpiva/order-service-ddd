export class Product {
  id?: number;
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  public getAsJson() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
