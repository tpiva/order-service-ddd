import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Global, Module } from '@nestjs/common';
import mikroOrmConfig from './mikro-orm.config';

@Global()
@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfig)],
})
export class DatabaseModule {}
