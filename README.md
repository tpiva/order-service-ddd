# Order Management System - E-commerce

> 🇧🇷 [Leia em Português](README.pt-BR.md)

## 📋 Description

This is an order management system for e-commerce developed in **NestJS** using **DDD Architecture** . The project implements a robust domain for order processing, with clear separation between business logic and external technologies.

It´s based on repository: [Order Service Hexagonal Architecture](https://github.com/tpiva/order-service-hex-architecture)

### 🎯 System Objectives

- **Order Processing**: Creation, validation, and management of order lifecycle
- **Payment Management**: Integration with payment gateways (Stripe, PayPal)
- **Inventory Control**: Stock validation and updates
- **Notification System**: Customer communication about order status
- **Shipping Calculation**: Integration with shipping APIs for freight calculation

## 🏗️ DDD Architecture

TBD

## 📁 Folder Structure

TBD

## 🚀 How to Run the Project

### Prerequisites

- Node.js (version 18 or higher)
- Yarn or npm

### Installation

```bash
# Install dependencies
yarn install
```

### Execution

```bash
# Development mode
yarn run start:dev

# Production mode
yarn run start:prod

# Debug mode
yarn run start:debug
```

## 🧪 Testing

```bash
# Unit tests
yarn run test

# Unit tests in watch mode
yarn run test:watch

# Tests with coverage
yarn run test:cov

# End-to-end tests
yarn run test:e2e

# Tests in debug mode
yarn run test:debug
```

## 📊 Test Coverage

The project maintains high test coverage, including:

- **Unit Tests**: For entities, use cases, and adapters
- **Integration Tests**: For controllers and repositories
- **End-to-End Tests**: For complete order creation flows

## 🔧 Technologies Used

- **Framework**: NestJS
- **Language**: TypeScript
- **Architecture**: Hexagonal (Ports and Adapters)
- **Testing**: Jest
- **Linting**: ESLint + Prettier

## 🎯 Implemented Use Cases

### Create Order

- **Endpoint**: `POST /orders`
- **Description**: Creates a new order with domain validations
- **Input**: Customer data and shipping address
- **Output**: Created order with unique ID and initial status

## 🔄 Data Flow

1. **HTTP Request** → Controller (Input Adapter)
2. **Controller** → UseCase (Core)
3. **UseCase** → Entity (Core) - Business validations
4. **UseCase** → Repository (Output Adapter) - Persistence
5. **Response** → Controller → HTTP Response

## 🚧 Next Steps

- [ ] Implement real database persistence
- [ ] Add inventory validations
- [ ] Integrate with payment gateways
- [ ] Implement notification system
- [ ] Add shipping calculation via shipping APIs
- [ ] Implement authentication and authorization
- [ ] Add logging and monitoring

## 📝 License

This project is under MIT license. See the [LICENSE](LICENSE) file for more details.

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For questions or support, contact through official NestJS channels:

- [NestJS Documentation](https://docs.nestjs.com)
- [NestJS Discord](https://discord.gg/G7Qnnhy)
