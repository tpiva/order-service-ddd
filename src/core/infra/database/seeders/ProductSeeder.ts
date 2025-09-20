import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Product } from 'src/domain/entities/order/product.entity';

export class ProductSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const products = [
      { name: 'Notebook Dell Inspiron 15' },
      { name: 'Mouse Logitech MX Master 3' },
      { name: 'Teclado Mecânico Corsair K95' },
      { name: 'Monitor LG UltraWide 29"' },
      { name: 'Headset HyperX Cloud II' },
      { name: 'Webcam Logitech C920' },
      { name: 'SSD Samsung 970 EVO 1TB' },
      { name: 'Placa de Vídeo RTX 4070' },
      { name: 'Processador Intel Core i7-13700K' },
      { name: 'Memória RAM Corsair 32GB DDR4' },
      { name: 'Smartphone iPhone 15 Pro' },
      { name: 'Tablet iPad Air 5ª Geração' },
      { name: 'Smartwatch Apple Watch Series 9' },
      { name: 'Fones de Ouvido AirPods Pro' },
      { name: 'Carregador Portátil Anker 20000mAh' },
      { name: 'Cabo USB-C para Lightning' },
      { name: 'Suporte para Notebook Ergonômico' },
      { name: 'Mousepad Gamer XXL' },
      { name: 'Cadeira Gamer DXRacer' },
      { name: 'Mesa para Computador em L' },
    ];

    const productEntities = products.map((productData) =>
      em.create(Product, productData),
    );

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
