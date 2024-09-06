import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  return {
    type: 'mysql',
    host: configService.get('db.host'),
    port: configService.get('db.port'),
    username: configService.get<string>('db.username'),
    password: configService.get<string>('db.password'),
    database: configService.get('db.database'),
    synchronize: configService.get('db.synchronize'),
    logging: configService.get('db.logging'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  };
};

const getTypeOrmConfigAsync = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
  return getTypeOrmConfig(configService);
};

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => getTypeOrmConfigAsync(configService),
};
