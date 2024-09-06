import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(cookieParser());
  const configService = app.get(ConfigService);
  const port = configService.get('http.port');
  await app.listen(port);
}
bootstrap();
