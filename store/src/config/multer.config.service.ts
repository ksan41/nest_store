import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ExceptionMessage } from 'src/common/ custom.exceptions';
import { fileConstants } from 'src/common/constants/constants';
import { v1 as uuid } from 'uuid';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(private configService: ConfigService) {}
  global = true;
  createMulterOptions(): MulterModuleOptions {
    return {
      limits: { fileSize: this.configService.get(fileConstants.fileSize) },
      fileFilter: (rq, file, cb) => {
        if (file.mimetype.includes('image')) {
          cb(null, true);
        } else {
          cb(new HttpException(ExceptionMessage.INVALID_FILE_TYPE, HttpStatus.BAD_REQUEST), false);
        }
      },
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = this.configService.get(fileConstants.dest);
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
    };
  }
}
