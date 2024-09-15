import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dbConstants } from 'src/common/constants/constants';

export const getTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  return {
    type: 'mysql',
    host: configService.get(dbConstants.host),
    port: configService.get(dbConstants.port),
    username: configService.get<string>(dbConstants.username),
    password: configService.get<string>(dbConstants.password),
    database: configService.get(dbConstants.database),
    synchronize: configService.get(dbConstants.synchronize),
    logging: configService.get(dbConstants.logging),
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  };
};

const getTypeOrmConfigAsync = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
  return getTypeOrmConfig(configService);
};

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => getTypeOrmConfigAsync(configService),
};
