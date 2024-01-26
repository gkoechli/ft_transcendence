import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { AuthService } from '@server/auth/auth.service';
import { PrismaModule } from '@server/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ChatController],
  providers: [AuthService],
})
export class ChatModule {}
