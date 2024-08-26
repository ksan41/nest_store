import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './config/data.source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap().then(() => {
  AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
      // here you can start to work with your database
    })
    .catch(err => {
      console.error('Error during Data Source initialization', err);
    });
});
