import { Migration } from '@mikro-orm/migrations';

export class Migration20251219203436 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table \`order_items\` drop foreign key \`order_items_product_id_foreign\`;`,
    );

    this.addSql(`alter table \`product\` modify \`id\` varchar(36) not null;`);

    this.addSql(
      `alter table \`order_items\` modify \`id\` varchar(36) not null, modify \`product_id\` varchar(36) not null;`,
    );
    this.addSql(
      `alter table \`order_items\` add constraint \`order_items_product_id_foreign\` foreign key (\`product_id\`) references \`product\` (\`id\`) on update cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table \`order_items\` drop foreign key \`order_items_product_id_foreign\`;`,
    );

    this.addSql(
      `alter table \`product\` modify \`id\` int unsigned not null auto_increment;`,
    );

    this.addSql(
      `alter table \`order_items\` modify \`id\` int unsigned not null auto_increment, modify \`product_id\` int unsigned not null;`,
    );
    this.addSql(
      `alter table \`order_items\` add constraint \`order_items_product_id_foreign\` foreign key (\`product_id\`) references \`product\` (\`id\`) on update cascade;`,
    );
  }
}
