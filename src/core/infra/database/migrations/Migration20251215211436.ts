import { Migration } from '@mikro-orm/migrations';

export class Migration20251215211436 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table \`address\` (\`id\` varchar(36) not null, \`street\` varchar(255) not null, \`city\` varchar(255) not null, \`state\` varchar(255) not null, \`street_number\` int not null, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`,
    );

    this.addSql(
      `create table \`orders\` (\`id\` varchar(36) not null, \`customer_id\` int not null, \`status\` enum('PENDING', 'PAID', 'SHIPPED', 'CANCELLED') not null, \`shipping_address_id\` varchar(36) not null, \`created_at\` datetime not null, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`,
    );
    this.addSql(
      `alter table \`orders\` add index \`orders_shipping_address_id_index\`(\`shipping_address_id\`);`,
    );

    this.addSql(
      `create table \`product\` (\`id\` int unsigned not null auto_increment primary key, \`name\` varchar(255) not null) default character set utf8mb4 engine = InnoDB;`,
    );

    this.addSql(
      `create table \`order_items\` (\`id\` int unsigned not null auto_increment primary key, \`product_id\` int unsigned not null, \`quantity\` int not null, \`price\` int not null, \`order_id\` varchar(36) not null) default character set utf8mb4 engine = InnoDB;`,
    );
    this.addSql(
      `alter table \`order_items\` add index \`order_items_product_id_index\`(\`product_id\`);`,
    );
    this.addSql(
      `alter table \`order_items\` add index \`order_items_order_id_index\`(\`order_id\`);`,
    );

    this.addSql(
      `alter table \`orders\` add constraint \`orders_shipping_address_id_foreign\` foreign key (\`shipping_address_id\`) references \`address\` (\`id\`) on update cascade;`,
    );

    this.addSql(
      `alter table \`order_items\` add constraint \`order_items_product_id_foreign\` foreign key (\`product_id\`) references \`product\` (\`id\`) on update cascade;`,
    );
    this.addSql(
      `alter table \`order_items\` add constraint \`order_items_order_id_foreign\` foreign key (\`order_id\`) references \`orders\` (\`id\`) on update cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table \`orders\` drop foreign key \`orders_shipping_address_id_foreign\`;`,
    );

    this.addSql(
      `alter table \`order_items\` drop foreign key \`order_items_order_id_foreign\`;`,
    );

    this.addSql(
      `alter table \`order_items\` drop foreign key \`order_items_product_id_foreign\`;`,
    );

    this.addSql(`drop table if exists \`address\`;`);

    this.addSql(`drop table if exists \`orders\`;`);

    this.addSql(`drop table if exists \`product\`;`);

    this.addSql(`drop table if exists \`order_items\`;`);
  }
}
