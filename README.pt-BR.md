# Sistema de Gerenciamento de Pedidos - E-commerce

## 📋 Descrição

Este é um sistema de gerenciamento de pedidos para e-commerce desenvolvido em **NestJS** utilizando **Arquitetura Hexagonal** (também conhecida como Ports and Adapters). O projeto implementa um domínio robusto para processamento de pedidos, com separação clara entre a lógica de negócio e as tecnologias externas.

### 🎯 Objetivos do Sistema

- **Processamento de Pedidos**: Criação, validação e gerenciamento do ciclo de vida dos pedidos
- **Gestão de Pagamentos**: Integração com gateways de pagamento (Stripe, PayPal)
- **Controle de Estoque**: Validação e atualização de estoque
- **Sistema de Notificações**: Comunicação com clientes sobre status dos pedidos
- **Cálculo de Frete**: Integração com APIs de correios para cálculo de frete

## 🏗️ Arquitetura Hexagonal

O projeto segue os princípios da **Arquitetura Hexagonal**, organizando o código em três camadas principais:

### 🎯 Core (Domínio)
- **Entidades**: Representam os objetos de negócio (Order, OrderItem, Address)
- **Casos de Uso**: Contêm a lógica de negócio (CreateOrderUseCase)
- **Repositórios**: Interfaces que definem contratos para persistência
- **Regras de Negócio**: Validações e regras específicas do domínio

### 🔌 Adapters (Adaptadores)
- **Controllers**: Adaptadores de entrada (REST API, GraphQL)
- **Repositories**: Adaptadores de saída para banco de dados
- **External Services**: Gateways de pagamento, APIs de frete, serviços de notificação

### 🌐 Ports (Portas)
- **Input Ports**: Interfaces que o core expõe para receber dados
- **Output Ports**: Interfaces que o core expõe para persistir dados

## 📁 Estrutura de Pastas

```
src
 ┣ adapters
 ┃ ┣ controllers
 ┃ ┃ ┣ dtos
 ┃ ┃ ┃ ┗ createOrder.dto.ts
 ┃ ┃ ┣ order.controller.spec.ts
 ┃ ┃ ┗ order.controller.ts
 ┃ ┗ database
 ┃ ┃ ┣ entities
 ┃ ┃ ┣ mappers
 ┃ ┃ ┣ repositories
 ┃ ┃ ┃ ┗ order
 ┃ ┃ ┃ ┃ ┣ address.repository.ts
 ┃ ┃ ┃ ┃ ┣ order-items.repository.ts
 ┃ ┃ ┃ ┃ ┣ order.repository.spec.ts
 ┃ ┃ ┃ ┃ ┗ order.repository.ts
 ┃ ┃ ┣ schemas
 ┃ ┃ ┃ ┗ order
 ┃ ┃ ┃ ┃ ┣ address.schema.ts
 ┃ ┃ ┃ ┃ ┣ order-item.schema.ts
 ┃ ┃ ┃ ┃ ┗ order.schema.ts
 ┃ ┃ ┣ database.module.ts
 ┃ ┃ ┗ mikro-orm.config.ts
 ┣ application
 ┃ ┗ modules
 ┃ ┃ ┗ order
 ┃ ┃ ┃ ┣ usecases
 ┃ ┃ ┃ ┃ ┗ createOrder
 ┃ ┃ ┃ ┃ ┃ ┣ createOrder.useCase.ts
 ┃ ┃ ┃ ┃ ┃ ┗ createOrder.usecase.spec.ts
 ┃ ┃ ┃ ┗ user.module.ts
 ┣ domain
 ┃ ┣ entities
 ┃ ┃ ┗ order
 ┃ ┃ ┃ ┣ address.entity.ts
 ┃ ┃ ┃ ┣ order-item.entity.ts
 ┃ ┃ ┃ ┣ order-status.entity.ts
 ┃ ┃ ┃ ┗ order.entity.ts
 ┃ ┣ errors
 ┃ ┣ filters
 ┃ ┣ repositories
 ┃ ┃ ┗ iorder.repository.ts
 ┃ ┣ types
 ┃ ┃ ┗ nullable.types.ts
 ┃ ┗ usecases
 ┃ ┃ ┗ usecase.ts
 ┣ migrations
 ┃ ┣ .snapshot-study.json
 ┃ ┗ Migration20250728222726.ts
 ┣ seeders
 ┃ ┗ DatabaseSeeder.ts
 ┣ app.module.ts
 ┗ main.ts
```

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- Yarn ou npm

### Instalação
```bash
# Instalar dependências
yarn install
```

### Execução
```bash
# Modo desenvolvimento
yarn run start:dev

# Modo produção
yarn run start:prod

# Modo debug
yarn run start:debug
```

## 🧪 Testes

```bash
# Testes unitários
yarn run test

# Testes unitários em modo watch
yarn run test:watch

# Testes com cobertura
yarn run test:cov

# Testes end-to-end
yarn run test:e2e

# Testes em modo debug
yarn run test:debug
```

## 📊 Cobertura de Testes

O projeto mantém uma alta cobertura de testes, incluindo:
- **Testes Unitários**: Para entidades, casos de uso e adaptadores
- **Testes de Integração**: Para controllers e repositórios
- **Testes End-to-End**: Para fluxos completos de criação de pedidos

## 🔧 Tecnologias Utilizadas

- **Framework**: NestJS
- **Linguagem**: TypeScript
- **Arquitetura**: Hexagonal (Ports and Adapters)
- **Testes**: Jest
- **Linting**: ESLint + Prettier

## 🎯 Casos de Uso Implementados

### Criar Pedido
- **Endpoint**: `POST /orders`
- **Descrição**: Cria um novo pedido com validações de domínio
- **Entrada**: Dados do cliente e endereço de entrega
- **Saída**: Pedido criado com ID único e status inicial

## 🔄 Fluxo de Dados

1. **Request HTTP** → Controller (Adapter de Entrada)
2. **Controller** → UseCase (Core)
3. **UseCase** → Entity (Core) - Validações de negócio
4. **UseCase** → Repository (Adapter de Saída) - Persistência
5. **Response** → Controller → HTTP Response

## 🚧 Próximos Passos

- [ ] Implementar persistência real no banco de dados
- [ ] Adicionar validações de estoque
- [ ] Integrar com gateways de pagamento
- [ ] Implementar sistema de notificações
- [ ] Adicionar cálculo de frete via API dos correios
- [ ] Implementar autenticação e autorização
- [ ] Adicionar logs e monitoramento

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através dos canais oficiais do NestJS:
- [Documentação NestJS](https://docs.nestjs.com)
- [Discord NestJS](https://discord.gg/G7Qnnhy) 