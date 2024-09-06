import { Module } from '@nestjs/common';
import { UserModule } from './domain/user/user.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './database/data.source';
import { ConfigModule } from '@nestjs/config';
import config from 'config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UserModule,
    CommonModule,
  ],
  providers: [],
})
export class AppModule {}
