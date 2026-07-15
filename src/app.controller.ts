import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async dashboard(@Req() req:Request, @Res() res:Response): Promise<void> {
    if (!req.session.userId) { res.redirect('/login'); return; }
    const user = await this.authService.findById(req.session.userId);
    if (!user) { res.redirect('/login'); return; }
    res.type('html').send(`<!doctype html><html lang="tr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Modüler Masraf</title><link rel="stylesheet" href="/public/style.css"></head>
<body><header class="topbar"><div><strong>MODÜLER MASRAF</strong><small>Enterprise v20.1.1</small></div>
<nav><a href="/">Ana Sayfa</a><a href="/health">Sistem Sağlığı</a><a href="/logout">Çıkış</a></nav></header>
<main><section class="card"><h1>Hoş geldin, ${user.name}</h1>
<p>Temel altyapı ve giriş sistemi çalışıyor.</p>
<div class="status-grid">
<div class="status-card"><span>🟢</span><b>NestJS</b><small>Çalışıyor</small></div>
<div class="status-card"><span>🟢</span><b>PostgreSQL</b><small>Bağlı</small></div>
<div class="status-card"><span>🟢</span><b>Prisma</b><small>Hazır</small></div>
<div class="status-card"><span>🟢</span><b>Session</b><small>Aktif</small></div>
</div></section></main></body></html>`);
  }
}
