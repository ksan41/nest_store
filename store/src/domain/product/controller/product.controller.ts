import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductService } from '../service/product.service';
import { ConfigService } from '@nestjs/config';

@Controller('product')
export class ProductController {
  constructor(private readonly configService: ConfigService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    // console.log(files);
  }

  // 수정
  // 삭제
}
