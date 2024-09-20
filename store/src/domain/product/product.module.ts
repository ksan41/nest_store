import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { ProductEntity } from './entity/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/config/multer.config.service';
import { ProductImage } from './entity/product.image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, ProductImage]),
    MulterModule.registerAsync({ useClass: MulterConfigService }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
