import { Module } from '@nestjs/common';
import { UserModule } from './domain/user/user.module';
import { CommonModule } from './common/common.module';
@Module({
  imports: [UserModule, CommonModule],
})
export class AppModule {}
