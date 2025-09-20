import { Migration } from '@mikro-orm/migrations';

export class Migration20250802153454 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table \`order_items\` modify \`product_id\` int unsigned not null;`,
    );
    this.addSql(
      `alter table \`order_items\` add constraint \`order_items_product_id_foreign\` foreign key (\`product_id\`) references \`product\` (\`id\`) on update cascade;`,
    );
    this.addSql(
      `alter table \`order_items\` add index \`order_items_product_id_index\`(\`product_id\`);`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table \`order_items\` drop foreign key \`order_items_product_id_foreign\`;`,
    );

    this.addSql(
      `alter table \`order_items\` drop index \`order_items_product_id_index\`;`,
    );

    this.addSql(
      `alter table \`order_items\` modify \`product_id\` int not null;`,
    );
  }
}
