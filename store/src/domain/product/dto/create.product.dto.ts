import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ProductEntity } from '../entity/product.entity';
import { ProductInfo } from '../vo/product.info';

export class CreateProductDto extends PartialType(ProductEntity) {
  @ApiProperty()
  info: ProductInfo;

  @ApiProperty()
  categoryId: number[];
}
