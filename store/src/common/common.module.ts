import { Module } from '@nestjs/common';
import { ShaEncryptionService } from './util/sha-encryption.service';
import { Base64StringService } from './util/base64.string.service';

@Module({
  providers: [ShaEncryptionService, Base64StringService],
})
export class CommonModule {}
