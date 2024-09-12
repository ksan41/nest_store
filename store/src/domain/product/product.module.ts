import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/config/multer.config.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), MulterModule.registerAsync({ useClass: MulterConfigService })],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
