import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from '@server/prisma/prisma.module';
import { AuthService } from '@server/auth/auth.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [AuthService],
})
export class UserModule {}
