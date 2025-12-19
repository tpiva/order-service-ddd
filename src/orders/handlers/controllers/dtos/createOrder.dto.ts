type AddressDto = {
  street: string;
  city: string;
  state: string;
  number: number;
};

type AddressResponseDto = {
  id: string;
  street: string;
  city: string;
  state: string;
  number: number;
};

type OrderItemDto = {
  productId: string;
  quantity: number;
  price: number;
};

type OrderItemResponseDto = {
  id: string;
  product: ProductResponseDto;
  quantity: number;
  price: number;
};

type ProductResponseDto = {
  id: string;
  name: string;
};

export class CreateOrderParamsDto {
  customerId: number;
  address: AddressDto;
  items?: OrderItemDto[];
}

export class CreateOrderResponseDto {
  id: string;
  customerId: number;
  status: string;
  shippingAddress: AddressResponseDto;
  items: OrderItemResponseDto[];
  createdAt: Date;
}
