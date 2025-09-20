import { Module } from '@nestjs/common';
import { UserModule } from './application/modules/order/user.module';
import { DatabaseModule } from './adapters/database/database.module';

@Module({
  imports: [UserModule, DatabaseModule],
})
export class AppModule {}
