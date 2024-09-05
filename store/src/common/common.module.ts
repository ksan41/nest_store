import { Module } from '@nestjs/common';
import { ShaEncryptionService } from './util/sha-encryption.service';

@Module({
  providers: [ShaEncryptionService],
})
export class CommonModule {}
