import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/infra/database/database.module';
import { UserModule } from './orders/user.module';

@Module({
  imports: [UserModule, DatabaseModule],
})
export class AppModule {}
