import { Body, Controller, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductService } from '../service/product.service';
import { CreateProductDto } from '../dto/create.product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(@Body() productDto: CreateProductDto) {
    return this.productService.createProduct(productDto);
  }

  @Post('upload/:id')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(@Param('id') productId: number, @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.productService.uploadFiles(productId, files);
  }

  // 수정
  // 삭제
}
