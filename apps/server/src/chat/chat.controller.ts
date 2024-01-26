import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from '@server/auth/auth.service';
import { PrismaService } from '@server/prisma/prisma.service';
import { Request, Response } from 'express';
import { z } from 'zod';

@Controller('chat')
export class ChatController {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  @Get('all')
  async getAllChats(@Req() req: Request, @Res() res: Response) {
    if (!(await this.authService.isLoggedIn(req))) {
      return res.status(401).json({ error: 'forbidden' });
    }

    const user = await this.authService.getLoggedInUser(req);
    if (!user) {
      return res.status(400).send({ error: 'No user found' });
    }

    const chats = await this.prisma.chat.findMany({
      where: {
        users: {
          some: {
            id: user.id,
          },
        },
        banned: {
          none: {
            id: user.id,
          },
        },
      },
      include: {
        messages: {
          select: {
            id: true,
            content: true,
            author: {
              select: {
                id: true,
                username: true,
                pfp: true,
                status: true,
                inGame: true,
                createdAt: true,
                updatedAt: true,
              },
            },
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
        users: {
          select: {
            id: true,
            username: true,
            pfp: true,
            status: true,
            inGame: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return res.status(200).json(chats);
  }

  @Get(':id/:password?')
  async getChat(@Req() req: Request, @Res() res: Response) {
    if (!(await this.authService.isLoggedIn(req))) {
      return res.status(401).json({ error: 'forbidden' });
    }

    const user = await this.authService.getLoggedInUser(req);
    if (!user) {
      return res.status(400).send({ error: 'No user found' });
    }
    const schema = z.object({
      id: z.coerce.number().min(0),
      password: z.string().optional(),
    });
    if (!schema.safeParse(req.params).success) {
      return res.status(400).send({ error: 'No/Invalid id provided' });
    }
    const { id, password } = schema.parse(req.params);

    const userFilter = {
      id: true,
      username: true,
      pfp: true,
      status: true,
      inGame: true,
      createdAt: true,
      updatedAt: true,
    };

    const chat: any = await this.prisma.chat.findFirst({
      where: {
        id: id,
      },
      include: {
        messages: {
          select: {
            id: true,
            content: true,
            author: {
              select: userFilter,
            },
            createdAt: true,
          },
        },
        users: {
          select: userFilter,
        },
        owner: {
          select: userFilter,
        },
        admins: {
          select: userFilter,
        },
        banned: {
          select: userFilter,
        },
        muted: {
          select: {
            user: {
              select: userFilter,
            },
          },
        },
      },
    });

    if (!chat) {
      return res.status(400).send({ error: 'No chat found' });
    }

    if (chat.banned.some((bannedUser: any) => bannedUser.id === user.id)) {
      return res.status(423).send({ error: 'You are banned from this chat' });
    }

    if (
      chat.type === 'private' &&
      !chat.users.some((u: any) => u.id === user.id)
    ) {
      return res
        .status(403)
        .send({ error: 'You are not in this private chat' });
    }

    // TODO: bcrypt password
    if (
      chat.type === 'protected' &&
      chat.password &&
      chat.password !== password
    ) {
      return res.status(403).send({ error: 'Incorrect password' });
    }

    for (const message of chat.messages) {
      message.author = {
        ...message.author,
        isFromUser: message.author.id === user.id,
      };
    }

    return res.status(200).json({
      ...chat,
      user: user,
    });
  }

  @Post('send')
  async sendMessage(@Req() req: Request, @Res() res: Response) {
    if (!(await this.authService.isLoggedIn(req))) {
      return res.status(401).json({ error: 'forbidden' });
    }

    const user = await this.authService.getLoggedInUser(req);
    if (!user) {
      return res.status(400).send({ error: 'No user found' });
    }
    const schema = z.object({
      id: z.number().min(0),
      content: z.string().min(1),
    });
    if (!schema.safeParse(req.body).success) {
      return res.status(400).send({ error: 'No/Invalid id provided' });
    }
    const { id, content } = schema.parse(req.body);

    const chat = await this.prisma.chat.findFirst({
      where: {
        id: id,
      },
      include: {
        users: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!chat) {
      return res.status(400).send({ error: 'No chat found' });
    }

    const msg = await this.prisma.message.create({
      data: {
        content: content,
        chatId: chat.id,
        userId: user.id,
      },
    });
    if (!msg) {
      return res.status(400).send({ error: 'Failed to send message' });
    }

    return res.status(200).json({
      success: true,
    });
  }
}
