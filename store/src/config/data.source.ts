import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'store',
  synchronize: true,
  logging: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
});
