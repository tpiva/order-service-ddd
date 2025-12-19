import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Product } from 'src/orders/domain/entities/product.entity';

export class ProductSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const products = [
      'Notebook Dell Inspiron 15',
      'Mouse Logitech MX Master 3',
      'Teclado Mecânico Corsair K95',
      'Monitor LG UltraWide 29"',
      'Headset HyperX Cloud II',
      'Webcam Logitech C920',
      'SSD Samsung 970 EVO 1TB',
      'Placa de Vídeo RTX 4070',
      'Processador Intel Core i7-13700K',
      'Memória RAM Corsair 32GB DDR4',
      'Smartphone iPhone 15 Pro',
      'Tablet iPad Air 5ª Geração',
      'Smartwatch Apple Watch Series 9',
      'Fones de Ouvido AirPods Pro',
      'Carregador Portátil Anker 20000mAh',
      'Cabo USB-C para Lightning',
      'Suporte para Notebook Ergonômico',
      'Mousepad Gamer XXL',
      'Cadeira Gamer DXRacer',
      'Mesa para Computador em L',
    ];

    const productEntities = products.map((name) => Product.create({ name }));

    await em.persistAndFlush(productEntities);
  }

  async down(em: EntityManager): Promise<void> {
    const products = [
      'Notebook Dell Inspiron 15',
      'Mouse Logitech MX Master 3',
      'Teclado Mecânico Corsair K95',
      'Monitor LG UltraWide 29"',
      'Headset HyperX Cloud II',
      'Webcam Logitech C920',
      'SSD Samsung 970 EVO 1TB',
      'Placa de Vídeo RTX 4070',
      'Processador Intel Core i7-13700K',
      'Memória RAM Corsair 32GB DDR4',
      'Smartphone iPhone 15 Pro',
      'Tablet iPad Air 5ª Geração',
      'Smartwatch Apple Watch Series 9',
      'Fones de Ouvido AirPods Pro',
      'Carregador Portátil Anker 20000mAh',
      'Cabo USB-C para Lightning',
      'Suporte para Notebook Ergonômico',
      'Mousepad Gamer XXL',
      'Cadeira Gamer DXRacer',
      'Mesa para Computador em L',
    ];

    await em.nativeDelete(Product, { name: { $in: products } });
  }
}
