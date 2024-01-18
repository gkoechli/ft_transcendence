import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from '@server/prisma/prisma.module';
import { AuthService } from '@server/auth/auth.service';
import { FriendService } from '@server/friend/friend.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [AuthService, FriendService],
})
export class UserModule {}
