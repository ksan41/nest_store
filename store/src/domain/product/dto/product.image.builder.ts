import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ProductImage } from '../entity/product.image.entity';
import { ProductEntity } from '../entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class CreateProductImageDto extends PartialType(ProductImage) {
  constructor(product: ProductEntity, savePath: string, saveName: string, fileName: string, ext: string, size: number) {
    super();
    this.product = product;
    this.savePath = savePath;
    this.saveName = saveName;
    this.fileName = fileName;
    this.size = size;
    this.ext = ext;
  }
  @ApiProperty()
  productId: number;
  product: ProductEntity;
  @ApiProperty()
  savePath: string;
  @ApiProperty()
  saveName: string;
  @ApiProperty()
  fileName: string;
  @ApiProperty()
  ext: string;
  @ApiProperty()
  size: number;

  static builder(): ProductImageBuilder {
    return new ProductImageBuilder();
  }
}

export class ProductImageBuilder {
  _product: ProductEntity;

  _savePath: string;

  _saveName: string;

  _fileName: string;

  _ext: string;

  _size: number;

  product(product: ProductEntity) {
    this._product = product;
    return this;
  }

  savePath(savePath: string) {
    this._savePath = savePath;
    return this;
  }

  saveName(saveName: string) {
    this._saveName = saveName;
    return this;
  }

  fileName(fileName: string) {
    this._fileName = fileName;
    return this;
  }

  ext(ext: string) {
    this._ext = ext;
    return this;
  }

  size(size: number) {
    this._size = size;
    return this;
  }

  build(): CreateProductImageDto {
    return new CreateProductImageDto(
      this._product,
      this._savePath,
      this._saveName,
      this._fileName,
      this._ext,
      this._size,
    );
  }
}
