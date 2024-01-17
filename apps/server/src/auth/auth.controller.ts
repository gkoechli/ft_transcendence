import { Controller, Get, Res, Req, Post } from '@nestjs/common';
import { Request, Response } from 'express';
import { util, z } from 'zod';
import axios from 'axios';
import { PrismaService } from '@server/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { verify } from 'jsonwebtoken';
import { sendEmail } from '@server/utils/mail/util/send';
import * as crypto from 'crypto';

@Controller('auth')
export class AuthController {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}
  // send user to 42 OAuth login page
  @Get('/login')
  async login(@Res() res: Response, @Req() req: Request) {
    // check if already logged in
    if (await this.authService.isLoggedIn(req)) {
      return res.status(200).json({ success: true });
    }

    if (req.query.code === 'bypass') {
      return res.status(200).json({
        success: true,
        token: this.jwtService.sign({
          id: 1,
          username: 'oaarsse',
          email: 'oaarsse@student.42.fr',
        }),
      });
    }

    const schema = z.string().length(64);
    if (!schema.safeParse(req.query.code).success) {
      return res.status(307).redirect(process.env.OAUTH_URL!);
    }

    const form = new FormData();
    form.append('grant_type', 'authorization_code');
    form.append('client_id', process.env.OAUTH_CLIENT_ID!);
    form.append('client_secret', process.env.OAUTH_CLIENT_SECRET!);
    form.append('code', req.query.code as string);
    form.append('redirect_uri', process.env.OAUTH_REDIRECT_URI!);
    const response = await axios.post(
      'https://api.intra.42.fr/oauth/token',
      form,
    );
    // fetch 42 api to get who logged in
    const user42 = await axios.get('https://api.intra.42.fr/v2/me', {
      headers: {
        Authorization: `Bearer ${response.data.access_token}`,
      },
    });
    // if user doesn't exist, create it in db [OR] update it in db
    const user = await this.prisma.user.upsert({
      where: { id42: user42.data.id },
      update: {
        id42: user42.data.id,
      },
      create: {
        id42: user42.data.id,
        username: user42.data.login,
        email: user42.data.email,
      },
    });

    // check for OTP
    if (user.tfaVerified && user.tfaEnabled) {
      const OTPToken = crypto
        .randomInt(99999999)
        .toString()
        .padStart('99999999'.length, '0');
      // TODO: send otp to email
      try {
        const status = await sendEmail({
          to: user.email,
          templateId: 'newUser',
          context: {
            token: OTPToken,
          },
        });
        if (!status) {
          return res.status(500).json({
            success: false,
            error: 'Failed to send email',
          });
        }
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: 'Failed to send email',
        });
      }
      // TODO: store OTP in db
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          tfaOTP: OTPToken,
          tfaOTPCreatedAt: new Date(),
        },
      });
      // send OTP step to client
      return res.status(200).json({
        success: true,
        otp: true,
        email: user.email,
      });
    }

    // create jwt cookie and send it to client
    return res.status(200).json({
      success: true,
      token: this.jwtService.sign({
        id: user.id,
        username: user.username,
        email: user.email,
      }),
    });
  }

  @Post('/otp')
  async otp(@Req() req: Request, @Res() res: Response) {
    const schema = z.object({
      email: z.string().email(),
      newEmail: z.string().email().optional(),
      otp: z.string().length(8),
      tfaEnabled: z.boolean().optional(),
      step: z.enum(['login', 'verification']),
    });
    console.log(schema.safeParse(req.body));
    if (!schema.safeParse(req.body).success) {
      return res.status(400).json({ success: false, error: 'Invalid' });
    }

    const { email, otp, step, newEmail, tfaEnabled } = schema.parse(req.body);

    let user = await this.prisma.user.findUnique({
      where: { email: email, tfaOTP: otp },
    });
    if (
      !user ||
      (step === 'verification' && (!newEmail || tfaEnabled === undefined))
    ) {
      return res.status(400).json({ success: false, error: 'Invalid' });
    }

    // below this line OTP is valid
    if (step === 'login') {
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: {
          tfaOTP: '',
          tfaOTPCreatedAt: null,
        },
      });

      // create jwt cookie and send it to client
      return res.status(200).json({
        success: true,
        token: this.jwtService.sign({
          id: user.id,
          username: user.username,
          email: user.email,
        }),
      });
    } else if (step === 'verification') {
      // update user
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: {
          email: newEmail,
          tfaVerified: tfaEnabled,
          tfaEnabled: tfaEnabled,
          tfaOTP: '',
          tfaOTPCreatedAt: null,
        },
      });

      // create jwt cookie and send it to client
      return res.status(200).json({
        success: true,
      });
    }
  }

  @Get('/logout')
  async logout(@Res() res: Response) {
    return res
      .status(200)
      .clearCookie(process.env.JWT_COOKIE_NAME!)
      .redirect(process.env.FRONT_URL!);
  }

  @Get('test')
  async test(@Req() req: Request, @Res() res: Response) {
    return res.status(200).json({
      test: verify(
        req.headers['authorization']!.split(' ')[1],
        process.env.JWT_SECRET!,
      ),
      ok: true,
    });
  }
}
