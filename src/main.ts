import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

declare module 'express-session' {
  interface SessionData { userId?: string; }
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.use(session({
    secret:process.env.SESSION_SECRET || 'moduler-v20-secret',
    resave:false,
    saveUninitialized:false,
    cookie:{
      httpOnly:true,
      sameSite:'lax',
      secure:process.env.NODE_ENV === 'production',
      maxAge:1000*60*60*12
    }
  }));
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix:'/public/' });
  const port = Number(process.env.PORT || 3000);
  await app.listen(port, '0.0.0.0');
  console.log(`Modüler Masraf v20.1.1 çalışıyor: ${port}`);
}
bootstrap().catch(error=>{ console.error(error); process.exit(1); });
