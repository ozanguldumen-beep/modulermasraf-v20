import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  loginPage(@Req() req: Request, @Res() res: Response): void {
    if (req.session.userId) { res.redirect('/'); return; }
    res.type('html').send(`<!doctype html><html lang="tr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Giriş</title><link rel="stylesheet" href="/public/style.css"></head>
<body class="login-body"><section class="login-card"><h1>Modüler Masraf</h1>
<p>Enterprise v20.1.1</p><form method="post" action="/login">
<label>E-posta</label><input name="email" type="email" required value="ozan@modulerotomasyon.com">
<label>Şifre</label><input name="password" type="password" required value="123456">
<button>Giriş Yap</button></form></section></body></html>`);
  }

  @Post('login')
  async login(@Body() body:{email?:string;password?:string}, @Req() req:Request, @Res() res:Response): Promise<void> {
    const user = await this.authService.validateUser(body.email ?? '', body.password ?? '');
    if (!user) {
      res.status(401).type('html').send('<h1>Giriş hatalı</h1><a href="/login">Geri dön</a>');
      return;
    }
    req.session.userId = user.id;
    res.redirect('/');
  }

  @Get('logout')
  logout(@Req() req:Request, @Res() res:Response): void {
    req.session.destroy(()=>res.redirect('/login'));
  }
}
